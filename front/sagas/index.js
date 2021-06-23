import { all, fork } from 'redux-saga/effects';
import axios from 'axios';

import userSaga from './user';
import postSaga from './post';

// saga에 공통 속성 적용
axios.defaults.baseURL = 'http://localhost:3065';
axios.defaults.withCredentials = true;

// 비동기 액션들을 동시에 실행
export default function* rootSaga() {
  yield all([
    fork(userSaga), 
    fork(postSaga),
  ]);
}
