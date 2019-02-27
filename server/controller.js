const yelp = require('yelp-fusion');

const apiKey = 'h4_q1q5YJlDRpeOGv3eqZKyDjvxbcbneydPEJf5JXwvTz3VaLW9tWHymOGEBvqsWlgXCahNAiXlCHk__6lNhGXJiwfVOd5dBt3HKCxPb8bvykHOJ3BCzaneanFV0XHYx';
const client = yelp.client(apiKey);

// const citySearch = document.getElementById('location-search');
// const apiKeyPlaces = 'AIzaSyBXhcKCDCTBA0RAMdmXscOqGF-ayDl0xYY';

// when userInput from searchbar is received from POST request, do GET Request to Yelp API
// in the response, send back the restaurants found in ctx.body

// client.search({
//   term: userInput,
//   location: 'barcelona, spain',
//   limit: 5
// }).then(response => {
// const results = response.jsonBody.businesses;
// console.log(results);
// }).catch(e => {
// console.log(e);
// });