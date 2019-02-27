const yelp = require('yelp-fusion');
const apiKey = 'h4_q1q5YJlDRpeOGv3eqZKyDjvxbcbneydPEJf5JXwvTz3VaLW9tWHymOGEBvqsWlgXCahNAiXlCHk__6lNhGXJiwfVOd5dBt3HKCxPb8bvykHOJ3BCzaneanFV0XHYx';
const client = yelp.client(apiKey);
const db = require('./models/index.js');

// const citySearch = document.getElementById('location-search');
// const apiKeyPlaces = 'AIzaSyBXhcKCDCTBA0RAMdmXscOqGF-ayDl0xYY';

exports.addToFavorites = async (ctx) => {
  console.log(db.Favorites);
  const selectedRestaurant = ctx.request.body;
  await db.Favorites.create(selectedRestaurant);

  // SequelizeDatabaseError: relation "Favorites" does not exist
  
  console.log('added to favorites');
  ctx.status = 200;
}

exports.searchRestaurants = async (ctx) => {
  const restaurant = ctx.request.body;
  
  await client.search(restaurant).then(response => {
    const results = response.jsonBody.businesses;
    ctx.body = results;
  }).catch(e => {
    console.log(e);
  });
  
}