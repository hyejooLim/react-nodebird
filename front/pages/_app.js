// _app.js is a parent of pages
import React from 'react';
import PropTypes from 'prop-types';
import 'antd/dist/antd.css';
import Head from 'next/head';

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

export default App;
