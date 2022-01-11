import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* fetchCityList() {
  try {
    const cities = yield axios.get('/api/data/cities');
    yield put({ type: 'SET_CITIES', payload: cities.data });
  } catch (error) {
    console.log('error getting cities list', error);
    yield put({ type: 'GET_ERROR' });
  }
}

function* fetchTypeList() {
  try {
    const types = yield axios.get('/api/data/types');
    yield put({ type: 'SET_TYPES', payload: types.data });
  } catch (error) {
    console.log('error getting types list:', error);
    yield put({ type: 'GET_ERROR' });
  }
}

function* fetchFeaturesList() {
  try {
    const features = yield axios.get('/api/data/features');
    yield put({ type: 'SET_FEATURES', payload: features.data });
  } catch (error) {
    console.log('error getting features list:', error);
    yield put({ type: 'GET_ERROR' });
  }
}

function* staticDataSaga() {
  yield takeLatest('FETCH_CITY_LIST', fetchCityList);
  yield takeLatest('FETCH_TYPE_LIST', fetchTypeList);
  yield takeLatest('FETCH_FEATURES_LIST', fetchFeaturesList);
}

export default staticDataSaga;
