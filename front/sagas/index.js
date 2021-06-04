import { all, fork, call, take, put } from 'redux-saga/effects';
import axios from 'axios';

function logInAPI(data) {
  return axios.post('/api/login', data); // 서버에 로그인 요청 보냄
}

// call: 동기 함수 호출 (promise > then)
// fork: 비동기 함수 호출
// put: action dispatch
// take: 액션이 실행될 때까지 기다림

// lonIn generator 
function* logIn(action) {
  try {
    const result = yield call(logInAPI, action.data); // logInAPI 함수에 action.data를 인자로 넘겨줌
    yield put({
      type: 'LOG_IN_SUCCESS',
      data: result.data
    });
  } catch (err) {
    yield put({
      type: 'LOG_IN_FAILURE',
      data: err.response.data
    })
  }
}

function logOutAPI() {
  return axios.post('/api/logout'); // 서버에 로그인 요청 보냄
}

// lonOut generator 
function* logOut() {
  try {
    const result = yield call(logOutAPI);
    yield put({
      type: 'LOG_OUT_SUCCESS',
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: 'LOG_OUT_FAILURE',
      data: err.response.data
    })
  }
}

function addPostAPI(data) {
  return axios.post('/api/post', data); // 서버에 로그인 요청 보냄
}

// addPost generator 
function* addPost(action) {
  try {
    const result = yield call(addPostAPI, action.data);
    yield put({
      type: 'ADD_POST_SUCCESS',
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: 'ADD_POST_FAILURE',
      data: err.response.data
    })
  }
}

function* watchLogin() {
  yield take('LOG_IN_REQUEST', logIn); // LOG_IN_REQUEST 액션이 실행되면 logIn generator 실행
}

function* watchLogOut() {
  yield take('LOG_OUT_REQUEST', logOut);
}

function* watchAddPost() {
  yield take('ADD_POST_REQUEST', addPost);
}

export default function* rootSaga() {
  yield all([
    // 비동기 액션들을 동시에 실행
    fork(watchLogin), 
    fork(watchLogOut),
    fork(watchAddPost),
  ]);
}
