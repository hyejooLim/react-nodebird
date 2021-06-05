import { all, fork, put, delay, takeLatest } from "redux-saga/effects";
import axios from 'axios';

function addPostAPI(data) {
  return axios.post('/api/post', data); // 서버에 로그인 요청 보냄
}

// addPost generator 
function* addPost(action) {
  try {
    // const result = yield call(addPostAPI, action.data);
    yield delay(1000);
    yield put({
      type: 'ADD_POST_SUCCESS',
    });
  } catch (err) {
    yield put({
      type: 'ADD_POST_FAILURE',
      data: err.response.data
    })
  }
}

function* watchAddPost() {
  yield takeLatest('ADD_POST_REQUEST', addPost);
}

export default function* postSaga() {
  yield all([
    fork(watchAddPost),
  ]);
}