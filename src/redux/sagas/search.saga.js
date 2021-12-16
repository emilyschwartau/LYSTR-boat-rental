import { put, takeLatest } from "redux-saga/effects";
import axios from "axios";

function* fetchVehicles({payload}) {

  

  const location = payload.location
  const startDate = payload.startDate
  const vehicleType = payload.vehicleType
  
  console.log('in fetchVehicles payload:', location, startDate, vehicleType)
  try {
    const types = yield axios.get(`/api/search/${location}/${startDate}/${vehicleType}`);
    yield put({ type: "SET_VEHICLES", payload: types.data });
  } catch (error) {
    console.log("error getting search results:", error);
    yield put({ type: "GET_ERROR" });
  }
}

function* fetchAutoComplete() {
  try {
    const features = yield axios.get("/api/location/");
    yield put({ type: "SET_AUTOCOMPLETE", payload: features.data });
  } catch (error) {
    console.log("error getting search results:", error);
    yield put({ type: "GET_ERROR" });
  }
}

function* searchSaga() {
  yield takeLatest("FETCH_VEHICLES", fetchVehicles);
  yield takeLatest("FETCH_AUTOCOMPLETE", fetchAutoComplete);
}

export default searchSaga;
