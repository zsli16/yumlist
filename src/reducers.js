import { combineReducers } from 'redux';

// display search results to user only
const searchList = (state = [], action) => {
  switch(action.type) {
    case 'UPDATE_SEARCHRESULTS':
      return action.results
    default:
      return state;
  }
}

// adds and removes restaurants in the database and in the browser
const favoritesList = (state = [], action) => {
  switch(action.type) {
    case 'ADDTOLIST':
      return [action.restaurant, ...state]
    case 'REMOVEFROMLIST':
      return state.filter((restaurant) => restaurant.id !== action.restaurant.id);
    default:
      return state;
  }
}

const reducers = combineReducers({
  searchList,
  favoritesList
});

export default reducers