import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';


function* fetchVehicles({ payload }) {
  const location = payload.location;
  const startDate = payload.startDate;
  const vehicleType = payload.vehicleType;

  console.log('in fetchVehicles payload:', location, startDate, vehicleType);
  try {
    yield put({ type: 'SET_SEARCH_QUERY', payload });
    const types = yield axios.get(
      `/api/search/${location}/${startDate}/${vehicleType}`
    );
    console.log('in searchSaga fetchVehicles response types:', types);
    let street, city = location, state, zip;
    const coords = yield axios.get(`/api/geocode/${street}/${city}/${state}/${zip}`);
    console.log(`city coords`, coords.data);
    yield put({ type: 'SET_SEARCH_RESULTS', payload: {types: types.data, coords: coords.data} });
  } catch (error) {
    console.log('error getting search results:', error);
    yield put({ type: 'GET_ERROR' });
  }
}

function* fetchAutoComplete() {
  try {
    const features = yield axios.get('/api/location/');
    yield put({ type: 'SET_AUTOCOMPLETE', payload: features.data });
  } catch (error) {
    console.log('error getting search results:', error);
    yield put({ type: 'GET_ERROR' });
  }
}

function* fetchCityCoords({ payload }) {
  try {
    const coords = yield axios.get(`/api/geocode/`, { city: payload });
    yield put({ type: "SET_SEARCH_CITY_COORDS", payload: coords.data });
  }
  catch (error) {
    console.log("error getting search city coordinates", error);
    yield put({ type: "FETCH_SEARCH_CITY_COORDS_ERROR" });
  }
}

function* searchSaga() {
  yield takeLatest("FETCH_VEHICLES", fetchVehicles);
  yield takeLatest("FETCH_AUTOCOMPLETE", fetchAutoComplete);
  yield takeLatest("FETCH_SEARCH_CITY_COORDS", fetchCityCoords)
}

export default searchSaga;
