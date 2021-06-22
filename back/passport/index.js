// passport settings

const passport = require('passport');
const local = require('passport-local');

module.exports = () => {
  passport.serializeUser(() => {

  });

  passport.deserializeUser(() => {

  });

  local();
};