// passport settings

const passport = require('passport');
const local = require('./local');
const { User } = require('../models');

module.exports = () => {
  passport.serializeUser((user, done) => {
    done(null, user.id); // session에 id만 저장
  });

  // 라우터에 접근할 때마다 매번 실행 (DB로부터 사용자 정보 복구)
  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findOne({ where: { id } });
      done(null, user); // req.user에 user를 넣어줌
    } catch (error) {
      console.error(error);
      done(error);
    }
  });

  local();
};
