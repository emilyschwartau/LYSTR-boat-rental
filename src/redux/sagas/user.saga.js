import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// worker Saga: will be fired on "FETCH_USER" actions
function* fetchUser() {
  try {
    const config = {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    };

    // the config includes credentials which
    // allow the server session to recognize the user
    // If a user is logged in, this will return their information
    // from the server session (req.user)
    const response = yield axios.get('/api/user', config);

    // now that the session has given us a user object
    // with an id and username set the client-side user object to let
    // the client-side code know the user is logged in
    yield put({ type: 'SET_USER', payload: response.data });
  } catch (error) {
    console.log('User get request failed', error);
  }
}

function* updateProfile(action) {
  try {
    yield put({ type: 'START_LOADING' });
    yield axios.put('/api/user', action.payload);
    yield put({ type: 'FETCH_USER' });
    yield put({ type: 'STOP_LOADING' });
    console.log('Profile Updated!');
  } catch (error) {
    console.log('error updating profile:', error);
    yield put({ type: 'PUT_ERROR' });
  }
}

function* updateProfilePic(action) {
  const { newPic, oldPic } = action.payload;
  const formData = new FormData();
  formData.append('profilePic', newPic);
  formData.append('oldPic', oldPic);
  try {
    yield put({ type: 'START_LOADING' });
    yield axios.put('/api/user/pic', formData);
    yield put({ type: 'STOP_LOADING' });
    yield put({ type: 'FETCH_USER' });
  } catch (error) {}
}

function* userSaga() {
  yield takeLatest('FETCH_USER', fetchUser);
  yield takeLatest('UPDATE_PROFILE', updateProfile);
  yield takeLatest('UPDATE_PROFILE_PIC', updateProfilePic);
}

export default userSaga;
