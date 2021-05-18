// _app.js is a parent of pages
import React from 'react';
import PropTypes from 'prop-types';
import 'antd/dist/antd.css';

const App = ({ Component }) => {
  return (
    <>
      <Component />
    </>
  );
};

// Check property
App.propTypes = {
  Component: PropTypes.elementType.isRequired,
};

export default App;
