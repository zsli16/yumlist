export const updateSearchResults = (results) => ({
  type: 'UPDATE_SEARCHRESULTS',
  results
})

export const addToList = (restaurant) => ({
  type: 'ADDTOLIST',
  restaurant
})

export const removeFromList = (restaurantId) => ({
  type: 'REMOVEFROMLIST',
  restaurantId
})