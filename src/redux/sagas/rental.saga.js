import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* bookVehicle(action) {
  const { vehicleId, date } = action.payload;
  try {
    yield put({ type: 'START_LOADING' });
    // post to rental table
    yield axios.post(`/api/rental/${vehicleId}`, { date });
    // mark availability date as rented
    yield axios.put(
      `/api/vehicle/availability?vehicleId=${vehicleId}&date=${date}`
    );
    yield put({ type: 'STOP_LOADING' });
    console.log('vehicle booked!');
    yield put({ type: 'OPEN_SUCCESS' });
  } catch (error) {
    console.log('error booking vehicle:', error);
    yield put({ type: 'POST_ERROR' });
  }
}

function* rentalSaga() {
  yield takeLatest('BOOK_VEHICLE', bookVehicle);
}

export default rentalSaga;
