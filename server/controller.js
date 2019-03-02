const yelp = require('yelp-fusion');
const apiKey = 'h4_q1q5YJlDRpeOGv3eqZKyDjvxbcbneydPEJf5JXwvTz3VaLW9tWHymOGEBvqsWlgXCahNAiXlCHk__6lNhGXJiwfVOd5dBt3HKCxPb8bvykHOJ3BCzaneanFV0XHYx';
const client = yelp.client(apiKey);
const db = require('./models/index.js');

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

exports.getListInfo = async (ctx) => {
  const listId = ctx.params.listId;
  console.log('get listId from server', listId);
  try {
    const listInfo = await db.Lists.findOne({
      where: {
        id: listId
      },
      raw: true
    })
    console.log('selected list', listInfo);
    ctx.body = listInfo;
    ctx.status = 200;
  } catch (err) {
    console.log(err);
  }
}

exports.loadFavoritesFromList = async (ctx) => {
  const listId = ctx.params.listId;
  console.log('entered load favs from list and listid is', listId);

  try {
    const favoritesOnLoad = await db.Favorites.findAll({
      include: [{
        model: db.Lists,
        where: { id: listId }
      }]
    });
    ctx.body = favoritesOnLoad;
    ctx.status = 200;
  } catch (err) {
    console.log(err);
  }

}

exports.addToFavorites = async (ctx) => {
  const selectedRestaurant = ctx.request.body;
  const currentListId = ctx.params.list;

  // first, get all restaurants in this list
  const list = await db.Lists.find({
    where: { id: currentListId },
    include: [{
      model: db.Favorites,
      attributes: ['id'],
    }]
  });
  
  // then, check if the restaurant exists in this list
  const restaurantExistsInList = list.dataValues.Favorites.filter(restaurant => restaurant.id === selectedRestaurant.id);
  console.log('restaurant exists in the list', restaurantExistsInList)

  if (restaurantExistsInList.length !== 0) {
    ctx.body = {
      "error": ['Already added']
    }
    ctx.status = 400;
  } else {
    try {

      //check if the restaurant exists in the Favorites Database (main table)
      const fav = await db.Favorites.find({
        where: {
          id: selectedRestaurant.id
        }
      })
      
      if (fav) {
        // if it exists, then just add it to the List
        await db.FavoritesLists.create({favoriteId: selectedRestaurant.id, listId: currentListId});
        ctx.body = selectedRestaurant;
        console.log(selectedRestaurant);
        ctx.status = 200;
      } else {
        await db.Favorites.create(selectedRestaurant);
        await db.FavoritesLists.create({favoriteId: selectedRestaurant.id, listId: currentListId});
        ctx.body = selectedRestaurant;
        console.log(selectedRestaurant);
        ctx.status = 200;
      }

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
  const submittedList = ctx.request.body;

  try {
    const newList = await db.Lists.create({
      listname: submittedList.listname,
      listdetails: submittedList.listdetails,
      id: submittedList.listId //refactor this to generate the UUID in the backend instead of the frontend
    })
    ctx.body = newList;
    console.log('newList created', newList);
    ctx.status = 200;
  } catch (err) {
    console.log(err);
    ctx.status = 500;
  }
}

