import { createWrapper } from 'next-redux-wrapper';
import { applyMiddleware, compose, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';

import reducer from '../reducers';
import rootSaga from '../sagas';

// 액션이 디스패치되는 것을 로깅하는 미들웨어
const loggerMiddleware = ({ dispatch, getState }) => (next) => (action) => {
  console.log(action); // 액션을 실행하기 전에 콘솔 창에 액션을 찍어줌
  return next(action);
}

const configureStore = () => {
  const sagaMiddleware = createSagaMiddleware();
  const middlewares = [sagaMiddleware, loggerMiddleware];
  const enhancer = process.env.NODE_ENV === 'production'
  ? compose(applyMiddleware(...middlewares))
  : composeWithDevTools(applyMiddleware(...middlewares));

  const store = createStore(reducer, enhancer);
  store.sagaTask = sagaMiddleware.run(rootSaga); // store를 생성한 이후에 rootSaga 실행
  return store;
}

// 개발 모드일 경우 debug를 true로 설정
const wrapper = createWrapper(configureStore, {
  debug: process.env.NODE_ENV === 'development',
});

export default wrapper;