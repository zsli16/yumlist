const yelp = require('yelp-fusion');
const apiKey = 'h4_q1q5YJlDRpeOGv3eqZKyDjvxbcbneydPEJf5JXwvTz3VaLW9tWHymOGEBvqsWlgXCahNAiXlCHk__6lNhGXJiwfVOd5dBt3HKCxPb8bvykHOJ3BCzaneanFV0XHYx';
const client = yelp.client(apiKey);
const db = require('./models/index.js');
const crypto = require('crypto');

exports.searchRestaurants = async (ctx) => {
  const restaurant = ctx.request.body;
  try {
    await client.search(restaurant).then(response => {
      const results = response.jsonBody.businesses;
      ctx.body = results;
    })
  } catch (err) {
    console.log(err);
  }
}

exports.loadFavoritesFromList = async (ctx) => {
  const listId = ctx.params.listId;

  try {
    const favorites = await db.FavoritesLists.findAll({
      where: {
        listId: listId
      },
      attributes: ['favoriteId']
    });
    
    const favoritesOnLoad = await Promise.all(favorites.map(async (favorite) => {
      await db.Favorites.findAll({
        where: {
          id: favorite.dataValues.favoriteId
        }
      })
    }))
    .catch(err => {
      console.log(err)
    })

    ctx.body = favoritesOnLoad;
    ctx.status = 200;
  } catch (err) {
    console.log(err);
    ctx.status = 404;
  }
}

exports.addToFavorites = async (ctx) => {
  const selectedRestaurant = ctx.request.body;
  const currentList = ctx.params.list;

  const restaurantExistsInList = await db.FavoritesLists.findAll({
    where: {
      favoriteId: selectedRestaurant.id,
      listId: currentList
    }
  });

  if (restaurantExistsInList.length !== 0) {
    console.log('Already exists in list')
    ctx.status = 200;
  } else {
    try {
      await db.Favorites.create(selectedRestaurant);
      await db.FavoritesLists.create({favoriteId: selectedRestaurant.id, listId: currentList});
      ctx.body = selectedRestaurant;
      ctx.status = 200;
    } catch (err) {
      console.log(err);
    }
  }

}

exports.removeFromFavorites = async (ctx) => {
  const restaurantId = ctx.params.id;
  const listId = ctx.params.list;
  try {
    await db.FavoritesLists.destroy({
      where: {
         favoriteId: restaurantId,
         listId: listId
      }
    });
    ctx.status = 200;
  } catch (err) {
    console.log(err); //eslint-disable-line
    ctx.status = 500;
  }
}

exports.createList = async (ctx) => {
  const listOfRestaurants = ctx.request.body;

  const doesListExist = await db.Lists.findAll({
    where: {
      id: listOfRestaurants.listId
    }
  })

  if (doesListExist.length !== 0) {
    console.log('List already exists')
  } else {
    const newList = await db.Lists.create({
      listname: listOfRestaurants.listname,
      listdetails: listOfRestaurants.listdetails,
      id: listOfRestaurants.listId
    });

    const restaurantsInList = listOfRestaurants.restaurantsinlist;
  
    await Promise.all(restaurantsInList.map(async (restaurant) => {
      await db.FavoritesList.create({
        favoriteId: restaurant.id,
        listId: newList.id
      })
    }))
    .catch(err => {
      console.log(err);
    })
  }

}

