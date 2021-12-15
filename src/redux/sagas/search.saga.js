import { put, takeLatest } from "redux-saga/effects";
import axios from "axios";

function* fetchDate() {
  try {
    const types = yield axios.get("/api/search/types");
    yield put({ type: "SET_VEHICLES", payload: types.data });
  } catch (error) {
    console.log("error getting search results:", error);
    yield put({ type: "GET_ERROR" });
  }
}

function* fetchLocation() {
  try {
    const features = yield axios.get("/api/search/");
    yield put({ type: "SET_LOCATION", payload: features.data });
  } catch (error) {
    console.log("error getting search results:", error);
    yield put({ type: "GET_ERROR" });
  }
}

function* searchSaga() {
  yield takeLatest("FETCH_VEHICLES", fetchDate);
  yield takeLatest("FETCH_LOCATION", fetchLocation);
}

export default searchSaga;
