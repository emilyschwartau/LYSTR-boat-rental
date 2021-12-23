import { combineReducers } from 'redux';

const bookingInput = (state = { date: '' }, action) => {
  switch (action.type) {
    case 'BOOKING_FORM_ONCHANGE':
      return { [action.payload.property]: action.payload.value };
    default:
      return state;
  }
};

export default combineReducers({
  bookingInput,
});
