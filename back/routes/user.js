const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');

const { User, Post } = require('../models');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');

const router = express.Router();

router.post('/login', isNotLoggedIn, (req, res, next) => {
  passport.authenticate('local', (serverError, user, clientError) => { // local.js 실행
    if (serverError) {
      console.error(serverError);
      return next(serverError);
    }
    if (clientError) {
      return res.status(401).send(clientError.reason);
    }

    // req.login 실행하면,
    // cookie 자동 생성
    // passport.serializeUser 실행 (user 정보가 들어감)
    return req.login(user, async (loginError) => {
      if (loginError) {
        console.error(loginError);
        return next(loginError);
      }
      const fullUserWithoutPassword = await User.findOne({
        where: { id: user.id },
        attributes: {
          exclude: ['password'] // password는 제외
        },
        include: [{
          model: Post
        }, {
          model: User,
          as: 'Followers'
        }, {
          model: User,
          as: 'Followings'
        }]
      });

      return res.status(200).json(fullUserWithoutPassword); // 사용자 정보를 프론트로 넘겨줌
    })
  })(req, res, next);
});

router.post('/', isNotLoggedIn, async (req, res, next) => { // POST /user
  try {
    const exUser = await User.findOne({
      where: {
        email: req.body.email
      }
    });
    if (exUser) { // 이미 가입한 이메일이라면
      return res.status(403).send('이미 사용 중인 아이디입니다.');
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    // 테이블 안에 데이터 삽입
    await User.create({ 
      email: req.body.email,
      password: hashedPassword,
      nickname: req.body.nickname
    });
    res.status(200).send('ok');
  } catch (error) {
    console.error(error);
    next(error); // status 500 (server error)
  }
});

router.use('/logout', isLoggedIn, (req, res) => {
  req.logout();
  req.session.destroy();
  res.send('ok');
});

module.exports = router;
