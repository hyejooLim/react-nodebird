import { all, fork } from 'redux-saga/effects';

import userSaga from './user';
import postSaga from './post';

// 비동기 액션들을 동시에 실행
export default function* rootSaga() {
  yield all([
    fork(userSaga), 
    fork(postSaga),
  ]);
}
