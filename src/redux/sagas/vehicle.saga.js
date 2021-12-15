import { put, takeLatest } from "redux-saga/effects";
import axios from "axios";

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
  let response;
  try {
    // post a new entry to "vehicle" and get its id for the other table inserts
    response = yield axios.post("/api/vehicle", {
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
  } catch (error) {
    console.log("error posting new vehicle:", error);
    yield put({ type: "POST_ERROR" });
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
      case "FETCH_VECHICLE_TO_EDIT":
        yield put({ type: "SET_VECHICLE_FORM_INPUTS", payload: vehicle.data });
        break;
    }
  } catch (error) {}
}

function* vehicleSaga() {
  yield takeLatest("ADD_VEHICLE", addVehicle);
  yield takeLatest("FETCH_VECHICLE_TO_EDIT", fetchVehicleById);
}

export default vehicleSaga;
