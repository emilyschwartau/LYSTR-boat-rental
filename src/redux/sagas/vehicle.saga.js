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
    description,
    cabins,
    heads,
    dailyRate,
    features,
    photos,
    availability,
  } = action.payload;

  console.log(photos);
  // append the photo files to a FormData for multer upload
  const formData = new FormData();
  for (const photo of photos) {
    console.log(photo);
    formData.append('photos', photo);
  }
  let response;
  try {
    yield put({ type: 'START_LOADING' });
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
      description,
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
    yield put({ type: 'STOP_LOADING' });
    console.log('Vehicle Added!');
    yield put({ type: 'CLEAR_VEHICLE_FORM' });
    yield put({ type: 'OPEN_SUCCESS' });
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
      case 'FETCH_VEHICLE_TO_EDIT':
        yield put({
          type: 'SET_VECHICLE_FORM_INPUTS',
          payload: vehicle.data[0],
        });
        break;
      case 'FETCH_VEHICLE_BY_ID':
        yield put({ type: 'SET_VEHICLE_INFO', payload: vehicle.data[0] });
        break;
    }
  } catch (error) {
    console.log('error getting vehicle by id:', error);
    yield put({ type: 'GET_ERROR' });
  }
}

// GET listed vehicles by Owner
function* fetchListedVehiclesByOwner(action) {
  const userId = action.payload;
  try {
    let vehiclesListed = yield axios.get(`/api/vehicle/allVehiclesListed/${userId}`);

    for (let i in vehiclesListed.data) {
      let vehicleInfo = vehiclesListed.data[i];

      //get rental data for vehicle base on vehicle ID
      const rentalData = yield axios.get(
        `/api/rental/vehicle/${vehicleInfo.vehicleId}`
      );
  
      // adding rental data into vehicle info object
      vehiclesListed.data[i] = {
        ...vehicleInfo,
        rentalData: rentalData.data,
      };
    }

    yield put({
      type: `SET_LISTED_VEHICLES_BY_OWNER`,
      payload: vehiclesListed.data,
    });
  } catch (error) {
    console.log('Error getting all listed vehicles by owner id', error);
    yield put({ type: 'FETCH_LISTED_VEHICLES_BY_OWNER_ERROR' });
  }
}

// GET all reservations info by user id
function* fetchAllReservationsById(action) {
  const userId = action.payload;
  try {
    //getting reservations by user id w/o vehicle owner info
    let reservationsList = yield axios.get(
      `/api/vehicle/allReservations/${userId}`
    );

    for (let i in reservationsList.data) {
      let rental = reservationsList.data[i];
      // getting owner name from db by vehicle id
      const ownerName = yield axios.get(
        `/api/data/vehicleOwner/${rental.vehicleId}`
      );
      // adding owner names into reservations
      reservationsList.data[i] = {
        ...rental,
        ownerFirstName: ownerName.data[0].firstName,
        ownerLastName: ownerName.data[0].lastName,
      };
    }
    // setting reservations list into reducer
    yield put({
      type: `SET_ALL_RESERVATIONS_BY_ID`,
      payload: reservationsList.data,
    });
  } catch (error) {
    console.log(`ERROR getting reservations info by user ID`, error);
    yield put({ type: `FETCH_ALL_RESERVATIONS_BY_ID_ERROR` });
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
    description,
    cabins,
    heads,
    dailyRate,
    features,
    availability,
  } = action.payload;

  try {
    yield put({ type: 'START_LOADING' });
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
      description,
      cabins,
      heads,
      dailyRate,
    });

    yield axios.delete(`/api/vehicle/features/${vehicleId}`);
    yield axios.post(`/api/vehicle/features/${vehicleId}`, {
      features,
    });
    yield axios.delete(`/api/vehicle/availability/${vehicleId}`);
    yield axios.post(`/api/vehicle/availability/${vehicleId}`, {
      availability,
    });
    yield put({ type: 'STOP_LOADING' });
    console.log('Vehicle Updated!');
    yield put({ type: 'OPEN_SUCCESS' });
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

// POST a vehicle photo
function* uploadPhotos(action) {
  const { vehicleId, photos } = action.payload;
  console.log('payload.photos', photos);
  const formData = new FormData();
  for (const photo of photos) {
    console.log(photo);
    formData.append('photos', photo);
  }
  try {
    yield put({ type: 'START_LOADING' });
    yield axios.post(`/api/vehicle/photos/${vehicleId}`, formData);
    yield put({ type: 'FETCH_VEHICLE_PHOTOS', payload: vehicleId });
    yield put({ type: 'CLEAR_PHOTO_GALLERY_INPUT' });
    yield put({ type: 'STOP_LOADING' });
  } catch (error) {
    console.log('error posting photos:', error);
    yield put({ type: 'POST_ERROR' });
  }
}

// DELETE a vehicle's photo
function* deletePhoto(action) {
  const { photoId, vehicleId } = action.payload;
  try {
    yield axios.delete(`/api/vehicle/photos/${photoId}`);
    console.log('photo deleted!');
    yield put({ type: 'FETCH_VEHICLE_PHOTOS', payload: vehicleId });
  } catch (error) {
    console.log('error deleting vehicle photo:', error);
    yield put({ type: 'DELETE_ERROR' });
  }
}

function* vehicleSaga() {
  yield takeLatest('ADD_VEHICLE', addVehicle);
  yield takeLatest('FETCH_VEHICLE_TO_EDIT', fetchVehicleById);
  yield takeLatest('FETCH_VEHICLE_BY_ID', fetchVehicleById);
  yield takeLatest('UPDATE_VEHICLE', updateVehicle);
  yield takeLatest('FETCH_VEHICLE_PHOTOS', fetchVehiclePhotos);
  yield takeLatest('DELETE_PHOTO', deletePhoto);
  yield takeLatest(
    'FETCH_LISTED_VEHICLES_BY_OWNER',
    fetchListedVehiclesByOwner
  );
  yield takeLatest('FETCH_ALL_RESERVATIONS_BY_ID', fetchAllReservationsById);
  yield takeLatest('UPLOAD_IMAGES_FROM_GALLERY', uploadPhotos);
}

export default vehicleSaga;
