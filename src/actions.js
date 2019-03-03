export const updateSearchResults = (results) => ({
  type: 'UPDATE_SEARCHRESULTS',
  results
})

export const loadFavorites = (favorites) => ({
  type: 'LOAD_LIST',
  favorites
})

export const addToList = (restaurant) => ({
  type: 'ADDTOLIST',
  restaurant
})

export const removeFromList = (restaurantId) => ({
  type: 'REMOVEFROMLIST',
  restaurantId
})

export const voteForRestaurant = (restaurantId) => ({
  type: 'VOTE',
  restaurantId
})

export const unVoteForRestaurant = (restaurantId) => ({
  type: 'UNVOTE',
  restaurantId
})

