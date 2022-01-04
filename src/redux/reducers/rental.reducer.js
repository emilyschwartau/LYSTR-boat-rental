import { combineReducers } from 'redux';

const bookingInput = (state = { date: '' }, action) => {
  switch (action.type) {
    case 'BOOKING_FORM_ONCHANGE':
      return { [action.payload.property]: action.payload.value };
    case 'CLEAR_BOOKING_INPUT':
      return { date: '' };
    default:
      return state;
  }
};

const reservationResult = (state = {}, action) => {
  switch (action.type) {
    case 'SET_RESERVATION_RESULT':
      return action.payload;
    default:
      return state;
  }
};

const vehicleReservations = (state = [], action) => {
  switch (action.type) {
    case 'SET_VEHICLE_RESERVATIONS':
      return action.payload;
    default:
      return state;
  }
};

export default combineReducers({
  bookingInput,
  reservationResult,
  vehicleReservations,
});
