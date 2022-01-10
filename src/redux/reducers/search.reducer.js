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
    case 'SET_SEARCH_CITY_COORDS':
      return { ...state, lat: action.payload.lat, lng: action.payload.lng };
    case 'SET_SEARCH_QUERY':
      return action.payload;
    case 'CLEAR_SEARCH_QUERY':
      return { location: '', vehicleType: '', startDate: '' };
    default:
      return state;
  }
};

const searchResults = (state = {}, action) => {
  switch (action.type) {
    case 'SET_SEARCH_RESULTS':
      return {
        ...state,
        searchResults: action.payload.types,
        coords: action.payload.coords,
      };
    default:
      return state;
  }
};

export default combineReducers({
  searchQuery,
  searchResults,
});
