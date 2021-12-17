import { combineReducers } from 'redux';

const loading = (state = false, action) => {
  switch (action.type) {
    case 'START_LOADING':
      return true;
    case 'STOP_LOADING':
      return false;
    default:
      return state;
  }
};

const success = (state = false, action) => {
  switch (action.type) {
    case 'OPEN_SUCCESS':
      return true;
    case 'CLOSE_SUCCESS':
      return false;
    default:
      return state;
  }
};

export default combineReducers({
  loading,
  success,
});
