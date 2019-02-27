export const updateSearchResults = (results) => ({
  type: 'UPDATE_SEARCHRESULTS',
  results
})

export const addToList = (restaurantId) => ({
  type: 'ADDTOLIST',
  restaurantId
})

export const removeFromList = (restaurantId) => ({
  type: 'REMOVEFROMLIST',
  restaurantId
})