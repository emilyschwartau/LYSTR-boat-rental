import { put, takeLatest } from "redux-saga/effects";
import axios from "axios";

function* fetchVehicleTypes() {
  try {
    const types = yield axios.get("/api/vehicle/types");
    yield put({ type: "SET_TYPES", payload: types.data });
  } catch (error) {
    console.log("error getting types list:", error);
    yield put({ type: "GET_ERROR" });
  }
}

function* fetchFeaturesList() {
  try {
    const features = yield axios.get("/api/vehicle/features");
    yield put({ type: "SET_FEATURES", payload: features.data });
  } catch (error) {
    console.log("error getting features list:", error);
    yield put({ type: "GET_ERROR" });
  }
}

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
    formData.append("photos", photo);
  }
  try {
    // post a new entry to "vehicle" and get its id for the other table inserts
    const response = yield axios.post("/api/vehicle", {
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
    yield axios.post("/api/vehicle/features", {
      features,
      vehicleId: response.data[0].id,
    });
    // post to "availability"
    yield axios.post("/api/vehicle/availability", {
      availability,
      vehicleId: response.data[0].id,
    });
    // post to "photos"
    yield axios.post("/api/vehicle/photos", {
      formData,
      vehicleId: response.data[0].id,
    });
  } catch (error) {
    console.log("error posting new vehicle:", error);
    yield put({ type: "POST_ERROR" });
  }
}

function* vehicleSaga() {
  yield takeLatest("FETCH_VEHICLE_TYPES", fetchVehicleTypes);
  yield takeLatest("FETCH_FEATURES_LIST", fetchFeaturesList);
  yield takeLatest("ADD_VEHICLE", addVehicle);
}

export default vehicleSaga;
