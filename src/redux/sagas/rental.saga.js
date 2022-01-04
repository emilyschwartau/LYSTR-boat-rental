import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* bookVehicle(action) {
  const { vehicleId, date } = action.payload;
  try {
    yield put({ type: 'START_LOADING' });
    // post to rental table
    const response = yield axios.post(`/api/rental/${vehicleId}`, { date });
    // mark availability date as rented
    yield axios.put(
      `/api/vehicle/availability?vehicleId=${vehicleId}&date=${date}`
    );
    const reservation = yield axios.get(`/api/rental/${response.data[0].id}`);
    yield put({ type: 'SET_RESERVATION_RESULT', payload: reservation.data[0] });
    yield put({ type: 'STOP_LOADING' });
    console.log('vehicle booked!');
    yield put({ type: 'OPEN_SUCCESS' });
  } catch (error) {
    console.log('error booking vehicle:', error);
    yield put({ type: 'POST_ERROR' });
  }
}

function* fetchVehicleReservations(action) {
  const vehicleId = action.payload;
  console.log(action.payload);
  try {
    const response = yield axios.get(`/api/rental/vehicle/${vehicleId}`);
    yield put({ type: 'SET_VEHICLE_RESERVATIONS', payload: response.data });
  } catch (error) {
    console.log('error getting vehicle reservations:', error);
    yield put({ type: 'GET_ERROR' });
  }
}

function* rentalSaga() {
  yield takeLatest('BOOK_VEHICLE', bookVehicle);
  yield takeLatest('FETCH_VEHICLE_RESERVATIONS', fetchVehicleReservations);
}

export default rentalSaga;
