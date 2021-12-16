import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

// POST a new vehicle
function* addVehicle(action) {
  const {
    title,
    type,
    make,
    model,
    year,
    length,
    capacity,
    horsepower,
    street,
    city,
    state,
    zip,
    instructions,
    cabins,
    heads,
    dailyRate,
    features,
    photos,
    availability,
  } = action.payload;

  // append the photo files to a FormData for multer upload
  const formData = new FormData();
  for (let photo of photos) {
    formData.append('photos', photo);
  }
  let response;
  try {
    // post a new entry to "vehicle" and get its id for the other table inserts
    response = yield axios.post('/api/vehicle', {
      title,
      type,
      make,
      model,
      year,
      length,
      capacity,
      horsepower,
      street,
      city,
      state,
      zip,
      instructions,
      cabins,
      heads,
      dailyRate,
    });
    // post to "vehicle_features"
    yield axios.post(`/api/vehicle/features/${response.data[0].id}`, {
      features,
    });
    // post to "availability"
    yield axios.post(`/api/vehicle/availability/${response.data[0].id}`, {
      availability,
    });
    // post to "photos"
    yield axios.post(`/api/vehicle/photos/${response.data[0].id}`, formData);
    console.log('Vehicle Added!');
    yield put({ type: 'CLEAR_VEHICLE_FORM' });
  } catch (error) {
    console.log('error posting new vehicle:', error);
    yield put({ type: 'POST_ERROR' });
    if (response) {
      yield axios.delete(`/api/vehicle/${response.data[0].id}`);
    }
  }
}

// GET a specific vehicle by ID
function* fetchVehicleById(action) {
  const vehicleId = action.payload;
  try {
    const vehicle = yield axios.get(`/api/vehicle/${vehicleId}`);
    // dipatch to a reducer depending on the action that called this function
    switch (action.type) {
      case 'FETCH_VECHICLE_TO_EDIT':
        yield put({
          type: 'SET_VECHICLE_FORM_INPUTS',
          payload: vehicle.data[0],
        });
        break;
    }
  } catch (error) {
    console.log('error getting vehicle by id:', error);
    yield put({ type: 'GET_ERROR' });
  }
}

// UPDATE a vehicle
function* updateVehicle(action) {
  const {
    vehicleId,
    title,
    type,
    make,
    model,
    year,
    length,
    capacity,
    horsepower,
    street,
    city,
    state,
    zip,
    instructions,
    cabins,
    heads,
    dailyRate,
    features,
    availability,
    photos,
  } = action.payload;
  // append the photo files to a FormData for multer upload
  const formData = new FormData();
  for (let photo of photos) {
    formData.append('photos', photo);
  }
  try {
    yield axios.put(`/api/vehicle/${vehicleId}`, {
      title,
      type,
      make,
      model,
      year,
      length,
      capacity,
      horsepower,
      street,
      city,
      state,
      zip,
      instructions,
      cabins,
      heads,
      dailyRate,
    });
    yield axios.post(`/api/vehicle/photos/${vehicleId}`, formData);

    yield axios.delete(`/api/vehicle/features/${vehicleId}`);
    yield axios.post(`/api/vehicle/features/${vehicleId}`, {
      features,
    });
    yield axios.delete(`/api/vehicle/availability/${vehicleId}`);
    yield axios.post(`/api/vehicle/availability/${vehicleId}`, {
      availability,
    });
    console.log('Vehicle Updated!');
  } catch (error) {
    console.log('error updating vehicle:', error);
    yield put({ type: 'PUT_ERROR' });
  }
}

// GET a vehicle's photos
function* fetchVehiclePhotos(action) {
  const vehicleId = action.payload;
  try {
    const photos = yield axios.get(`/api/vehicle/photos/${vehicleId}`);
    console.log('photos GET success');
    yield put({ type: 'SET_PHOTOS', payload: photos.data });
  } catch (error) {
    console.log('error getting vehicle photos:', error);
    yield put({ type: 'GET_ERROR' });
  }
}

function* vehicleSaga() {
  yield takeLatest('ADD_VEHICLE', addVehicle);
  yield takeLatest('FETCH_VECHICLE_TO_EDIT', fetchVehicleById);
  yield takeLatest('UPDATE_VEHICLE', updateVehicle);
  yield takeLatest('FETCH_VEHICLE_PHOTOS', fetchVehiclePhotos);
}

export default vehicleSaga;
