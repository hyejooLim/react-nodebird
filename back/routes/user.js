const express = require('express');
const bcrypt = require('bcrypt');
const { User } = require('../models');

const router = express.Router();

router.post('/', async (req, res, next) => { // POST /user
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
    console.log(error);
    next(error); // status 500 (server error)
  }
});

module.exports = router;
