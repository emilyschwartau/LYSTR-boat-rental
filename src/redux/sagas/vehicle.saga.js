import { put, takeLatest } from "redux-saga/effects";
import axios from "axios";

function* fetchVehicleTypes() {
  try {
    const types = yield axios.get("/api/vehicle/types");
    yield put({ type: "SET_TYPES", payload: types.data });
  } catch (error) {
    console.log("error getting search results:", error);
    yield put({ type: "GET_ERROR" });
  }
}

function* fetchFeaturesList() {
  try {
    const features = yield axios.get("/api/vehicle/features");
    yield put({ type: "SET_FEATURES", payload: features.data });
  } catch (error) {
    console.log("error getting search results:", error);
    yield put({ type: "GET_ERROR" });
  }
}

function* vehicleSaga() {
  yield takeLatest("FETCH_VEHICLE_TYPES", fetchVehicleTypes);
  yield takeLatest("FETCH_FEATURES_LIST", fetchFeaturesList);
}

export default vehicleSaga;
