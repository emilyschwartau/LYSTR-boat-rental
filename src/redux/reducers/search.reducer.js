import { combineReducers } from 'redux';

const searchQuery = (
  state = { location: '', vehicleType: '', startDate: '' },
  action
) => {
  switch (action.type) {
    case 'SET_SEARCH_LOCATION':
      return { ...state, location: action.payload };
    case 'SET_SEARCH_DATE':
      return { ...state, startDate: action.payload };
    case 'SET_SEARCH_VEHICLE_TYPE':
      return { ...state, vehicleType: action.payload };
    case 'SET_SEARCH_QUERY':
      return action.payload;
    default:
      return state;
  }
};

const searchResults = (state = {}, action) => {
  switch (action.type) {
    case 'SET_SEARCH_RESULTS':
      return { ...action, searchResults: action.payload };
    default:
      return state;
  }
};

export default combineReducers({
  searchQuery,
  searchResults,
});
