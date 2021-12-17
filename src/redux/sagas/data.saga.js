import { put, takeLatest } from "redux-saga/effects";
import axios from "axios";

function* fetchTypeList() {
  try {
    const types = yield axios.get("/api/data/types");
    yield put({ type: "SET_TYPES", payload: types.data });
  } catch (error) {
    console.log("error getting types list:", error);
    yield put({ type: "GET_ERROR" });
  }
}

function* fetchFeaturesList() {
  try {
    const features = yield axios.get("/api/data/features");
    yield put({ type: "SET_FEATURES", payload: features.data });
  } catch (error) {
    console.log("error getting features list:", error);
    yield put({ type: "GET_ERROR" });
  }
}

function* fetchOwnerByVehicleId() {
  const vehicleId = action.payload;

  try {
    const owner = yield axios.get(`/api/data/vehicleOwner/${vehicleId}`);
    yield put({ type: "SET_OWNER_BY_VEHICLE_ID", payload: features.data });
  } catch (error) {
    console.log("error getting features list:", error);
    yield put({ type: "GET_ERROR" });
  }
}

function* dataSaga() {
  yield takeLatest("FETCH_TYPE_LIST", fetchTypeList);
  yield takeLatest("FETCH_FEATURES_LIST", fetchFeaturesList);
  yield takeLatest("FETCH_OWNER_BY_VEHICLE_ID", fetchOwnerByVehicleId);
}

export default dataSaga;
