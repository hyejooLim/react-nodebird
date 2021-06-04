// _app.js is a parent of pages
import React from 'react';
import PropTypes from 'prop-types';
import 'antd/dist/antd.css';
import Head from 'next/head';
import withReduxSaga from 'redux-saga';

import wrapper from '../store/configureStore';

// Next-redux-wrapper에서 자동으로 Provider로 감싸줌
const App = ({ Component }) => {
  return (
    <>
    <Head>
      <title>NodeBird</title>
    </Head>
      <Component />
    </>
  );
};

// Check property
App.propTypes = {
  Component: PropTypes.elementType.isRequired,
};

export default wrapper.withRedux(withReduxSaga(App));
