const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');
const { Op } = require('sequelize');

const { User, Post, Comment, Image } = require('../models');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');

const router = express.Router();

router.get('/', async (req, res, next) => { // GET /user
  try {
    if (req.user) {
      const user = await User.findOne({
        where: { id: req.user.id },
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
      res.status(200).json(user);
    } else {
      res.status(200).json(null);
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.get('/:userId', async (req, res, next) => { // GET /user/${userId}
  try {
    const fullUserInfo = await User.findOne({
      where: { id: req.params.userId },
      attributes: {
        exclude: ['password'] // password는 제외
      },
      include: [{
        model: Post,
        attributes: ['id']
      }, {
        model: User,
        as: 'Followers',
        attributes: ['id']
      }, {
        model: User,
        as: 'Followings',
        attributes: ['id']
      }]
    });
    // 개인 정보 보호
    if (fullUserInfo) {
      const data = fullUserInfo.toJSON();
      data.Posts = data.Posts.length;
      data.Followers = data.Followers.length;
      data.Followings = data.Followings.length;
      res.status(200).json(data);
      console.log(`userInfo.id! ${data.id} userInfo.nickname! ${data.nickname} userInfo.Followers! ${data.Followers}`);
    } else {
      res.status(404).send('존재하지 않는 사용자입니다.');
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.get('/:userId/posts', async (req, res, next) => { // GET /user/${userId}/posts
  try {
    const where = { UserId: req.params.userId };
    if (parseInt(req.query.lastId, 10)) {
      where.id = { [Op.lt]: parseInt(req.query.lastId, 10) } // lastId 보다 작은 게시물부터 10개 로딩
    }
    const posts = await Post.findAll({
      where,
      limit: 10,
      order: [['createdAt', 'DESC']],
      include: [{
        model: User, // 게시글 작성자
        attributes: ['id', 'nickname'],
      }, {
        model: Comment,
        include: [{
          model: User, // 댓글 작성자
          attributes: ['id', 'nickname']
        }]
      }, {
        model: Image
      }, {
        model: User, // 좋아요 누른 사람
        as: 'Likers',
        attributes: ['id']
      }, {
        model: Post,
        as: 'Retweet',
        include: [{
          model: User,
          attributes: ['id' ,'nickname']
        }, {
          model: Image
        }],
      }],
    });
    res.status(200).json(posts);
  } catch (error) {
    console.error(error)
    next(error);
  }
});

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
          model: Post,
          attributes: ['id']
        }, {
          model: User,
          as: 'Followers',
          attributes: ['id']
        }, {
          model: User,
          as: 'Followings',
          attributes: ['id']
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

router.patch('/nickname', isLoggedIn, async (req, res, next) => { // PATCH /user/nickname
  try {
    await User.update({
      nickname: req.body.nickname
    }, { 
        where: { id: req.user.id } // 조건
    });
    res.status(200).json({ nickname: req.body.nickname });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.patch('/:userId/follow', isLoggedIn, async (req, res, next) => { // PATCH /user/${userId}/follow
  try {
    const user = await User.findOne({
      where: { id: req.params.userId } 
    });
    if (!user) {
      return res.status(403).send('없는 사용자 입니다.');
    }
    await user.addFollowers(req.user.id);

    res.status(200).json({ UserId: parseInt(req.params.userId, 10) });
  } catch (error) {
    console.error(error);
    next(error); 
  }
});

router.delete('/:userId/unfollow', isLoggedIn, async (req, res, next) => { // DELETE /user/${userId}/unfollow
  try {
    const user = await User.findOne({
      where: { id: req.params.userId } 
    });
    if (!user) {
      return res.status(403).send('없는 사용자 입니다.');
    }
    await user.removeFollowers(req.user.id);

    res.status(200).json({ UserId: parseInt(req.params.userId, 10) });
  } catch (error) {
    console.error(error);
    next(error); 
  }
});

router.get('/followings', isLoggedIn, async (req, res, next) => { // GET /user/followings
  try {
    const user = await User.findOne({
      where: { id: req.user.id }
    });
    const followings = await user.getFollowings();
    res.status(200).json(followings);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.get('/followers', isLoggedIn, async (req, res, next) => { // GET /user/followers
  try {
    const user = await User.findOne({
      where: { id: req.user.id }
    });
    const followers = await user.getFollowers();
    res.status(200).json(followers);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.delete('/:userId/follower', async (req, res, next) => { // DELETE /user/${userId}/follower
  try {
    const user = await User.findOne({
      where: { id: req.params.userId }
    });
    if (!user) {
      return res.status(403).send('없는 사용자 입니다.');
    }
    await user.removeFollowings(req.user.id);
    res.status(200).json({ UserId: parseInt(req.params.userId, 10) });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
