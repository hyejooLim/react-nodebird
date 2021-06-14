import { all, fork, delay, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

import 
{ LOG_IN_REQUEST, LOG_IN_SUCCESS, LOG_IN_FAILURE,
  LOG_OUT_REQUEST, LOG_OUT_SUCCESS, LOG_OUT_FAILURE,
  SIGN_UP_REQUEST, SIGN_UP_SUCCESS, SIGN_UP_FAILURE, 
  FOLLOW_REQUEST, FOLLOW_SUCCESS, FOLLOW_FAILURE, 
  UNFOLLOW_REQUEST, UNFOLLOW_SUCCESS, UNFOLLOW_FAILURE,
} from '../reducers/user';

function logInAPI(data) {
  return axios.post('/api/login', data); // 서버에 로그인 요청 보냄
}

// call: 동기 함수 호출 (promise > then)
// fork: 비동기 함수 호출
// put: action dispatch
// take: 액션이 실행될 때까지 기다림 (일회용)

// logIn generator
function* logIn(action) {
  try {
    //const result = yield call(logInAPI, action.data); // logInAPI 함수에 action.data를 인자로 넘겨줌
    yield delay(1000); // 서버 없는 경우 비동기 효과
    yield put({
      type: LOG_IN_SUCCESS,
      data: action.data,
    });
  } catch (err) {
    yield put({
      type: LOG_IN_FAILURE,
      error: err.response.data,
    });
  }
}

function logOutAPI() {
  return axios.post('/api/logout'); 
}

// logOut generator
function* logOut() {
  try {
    // const result = yield call(logOutAPI);
    yield delay(1000);
    yield put({
      type: LOG_OUT_SUCCESS,
    });
  } catch (err) {
    yield put({
      type: LOG_OUT_FAILURE,
      error: err.response.data,
    });
  }
}

function signUpAPI() {
  return axios.post('/api/signup'); 
}

// signUp generator
function* signUp() {
  try {
    // const result = yield call(signUpAPI);
    yield delay(1000);
    yield put({
      type: SIGN_UP_SUCCESS,
    });
  } catch (err) {
    yield put({
      type: SIGN_UP_FAILURE,
      error: err.response.data,
    });
  }
}

function followAPI() {
  return axios.post('/api/follow'); 
}

// follow generator
function* follow(action) {
  try {
    // const result = yield call(followAPI);
    yield delay(1000);
    yield put({
      type: FOLLOW_SUCCESS,
      data: action.data,
    });
  } catch (err) {
    yield put({
      type: FOLLOW_FAILURE,
      error: err.response.data,
    });
  }
}

function unfollowAPI() {
  return axios.post('/api/unfollow'); 
}

// unfollow generator
function* unfollow(action) {
  try {
    // const result = yield call(unfollowAPI);
    yield delay(1000);
    yield put({
      type: UNFOLLOW_SUCCESS,
      data: action.data,
    });
  } catch (err) {
    yield put({
      type: UNFOLLOW_FAILURE,
      error: err.response.data,
    });
  }
}

// takeEvery: 무한대로 실행(비동기)
// takeLeading: 여러 번 요청했을 때 첫 번째 요청만 실행
// takeLatest: 여러 번 요청했을 때 이전 요청이 로딩 중이라면, 마지막 요청만 실행 (서버에서는 중복 요청 확인해야 함)
// throttle: 정해진 시간 동안 해당 액션 한 번 실행
function* watchLogIn() {
  yield takeLatest(LOG_IN_REQUEST, logIn); // LOG_IN_REQUEST 액션이 실행되면 logIn generator 실행
}

function* watchLogOut() {
  yield takeLatest(LOG_OUT_REQUEST, logOut);
}

function* watchSignUp() {
  yield takeLatest(SIGN_UP_REQUEST, signUp);
}

function* watchFollow() {
  yield takeLatest(FOLLOW_REQUEST, follow);
}

function* watchUnfollow() {
  yield takeLatest(UNFOLLOW_REQUEST, unfollow);
}

export default function* userSaga() {
  yield all([
    fork(watchLogIn), 
    fork(watchLogOut),
    fork(watchSignUp),
    fork(watchFollow),
    fork(watchUnfollow),
  ]);
}
