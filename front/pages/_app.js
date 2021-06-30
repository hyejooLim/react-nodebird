// _app.js is a parent of pages
import React from 'react';
import PropTypes from 'prop-types';
import 'antd/dist/antd.css';
import Head from 'next/head';
import styled from 'styled-components';

const AppWrapper = styled.div`
  font-family: 'menlo';
  background: #92C4B7;
`;

import wrapper from '../store/configureStore';

// Next-redux-wrapper에서 자동으로 Provider로 감싸줌
const App = ({ Component }) => {
  return (
    <AppWrapper>
      <Head>
        <title>NodeBird</title>
      </Head>
      <Component />
    </AppWrapper>
  );
};

// Check property
App.propTypes = {
  Component: PropTypes.elementType.isRequired,
};

export default wrapper.withRedux(App);
