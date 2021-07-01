const express = require('express');
const multer = require('multer');
const path = require('path'); // node 에서 제공
const fs = require('fs');

const { Post, Comment, User, Image, Hashtag } = require('../models');
const { isLoggedIn } = require('./middlewares');

const router = express.Router();

try {
  fs.accessSync('uploads');
} catch (error) {
  console.log('uploads 폴더를 생성합니다.');
  fs.mkdirSync('uploads'); // 'uploads' 폴더가 없으면 생성
}

// form 마다 형식이 다르기 때문에 라우터마다 별도 세팅
const upload = multer({
  storage: multer.diskStorage({ // 하드디스크에 저장
    destination(req, file, done) {
      done(null, 'uploads');
    },
    filename(req, file, done) {
      const ext = path.extname(file.originalname); // 확장자 추출(.png)
      const basename = path.basename(file.originalname, ext); // 파일명 추출
      done(null, basename + '_' + new Date().getTime() + ext);
    },
  }),
  limits: { fileSize: 20 * 1024 * 1024 }, // 20MB
});

router.post('/', isLoggedIn, upload.none(), async (req, res, next) => { // POST /post
  try {
    const hashtags = req.body.text.match(/#[^\s#]+/g);
    const post = await Post.create({
      content: req.body.text,
      UserId: req.user.id
    });
    if (hashtags) {
      const hashtag = await Promise.all(hashtags.map((tag) => Hashtag.findOrCreate({ 
        where: { name: tag.slice(1).toLowerCase() }
      }))); // [리액트, true]
      await post.addHashtags(hashtag.map((h) => h[0]));
    }
    if (req.body.image) { 
      if (Array.isArray(req.body.image)) { // 이미지가 여러 장인 경우 image: [image1.png, image2.png]
        const images = await Promise.all(req.body.image.map((image) => Image.create({ src: image })));
        await post.addImages(images);
      } else { // 이미지가 한 장인 경우 image: image.png
      const image = await Image.create({ src: req.body.image });
      await post.addImages(image);
      }
    }
    const fullPost = await Post.findOne({
      where: { id: post.id },
      include: [{
        model: User, // 게시글 작성자
        attributes: ['id', 'nickname']
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
      }]
    });

    res.status(201).json(fullPost);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.post('/images', isLoggedIn, upload.array('image'), (req, res, next) => { // POST /post/images
  console.log(req.files); // 이미지 업로드 정보
  res.status(200).json(req.files.map((v) => v.filename));
});

router.post('/:postId/comment', isLoggedIn, async (req, res, next) => { // POST /post/${postId}/comment
  try {
    const post = await Post.findOne({
      where: { id: req.params.postId },
    });
    if (!post) {
      return res.status(403).send('해당 게시글이 존재하지 않습니다.');
    }
    const comment = await Comment.create({
      content: req.body.content,
      PostId: parseInt(req.params.postId, 10),
      UserId: req.user.id,
    });
    const fullComment = await Comment.findOne({
      where: { id: comment.id },
      include: [{
        model: User,
        attributes: ['id', 'nickname']
      }]
    })
    res.status(201).json(fullComment);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.post('/:postId/retweet', isLoggedIn, async (req, res, next) => { // POST /post/${postId}/retweet
  try {
    const post = await Post.findOne({
      where: { id: req.params.postId },
      include: [{
        model: Post,
        as: 'Retweet'
      }],
    });
    if (!post) {
      return res.status(403).send('존재하지 않는 게시글입니다.');
    }
    if (req.user.id === post.UserId || (post.Retweet && req.user.id === post.Retweet.UserId)) {
      return res.status(403).send('자신의 글은 리트윗할 수 없습니다.');
    }
    const retweetTargetId = post.RetweetId || post.id;
    const exRetweetPost = await Post.findOne({
      where: {
        UserId: req.user.id,
        RetweetId: retweetTargetId
      }
    });
    if (exRetweetPost) {
      return res.status(403).send('이미 리트윗 하였습니다.');
    }
    const retweetPost = await Post.create({
      UserId: req.user.id,
      RetweetId: retweetTargetId,
      content: 'retweet'
    });
    const fullRetweetPost = await Post.findOne({
      where: { id: retweetPost.id },
      include: [{
        model: Post,
        as: 'Retweet',
        include: [{
          model: User,
          attributes: ['id' ,'nickname']
        }, {
          model: Image
        }],
      }, {
        model: User,
        attributes: ['id' ,'nickname']
      }, {
        model: User,
        as: 'Likers',
        attributes: ['id']
      }, {
        model: Image
      }, {
        model: Comment,
        include: [{
          model: User,
          attributes: ['id', 'nickname']
        }],
      }],
    });
    res.status(200).json(fullRetweetPost);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.patch('/:postId/update', isLoggedIn,  async (req, res, next) => { // PATCH /post/${postId}/update
  const hashtags = req.body.content.match(/#[^\s#]+/g);
  try {
    await Post.update({
      content: req.body.content
    }, { 
      where: { id: parseInt(req.params.postId, 10) } 
    });
    const post = await Post.findOne({
      where: { id: req.params.postId }
    });
    if (hashtags) {
      const hashtag = await Promise.all(hashtags.map((tag) => Hashtag.findOrCreate({ 
        where: { name: tag.slice(1).toLowerCase() }
      }))); // [리액트, true]
      await post.setHashtags(hashtag.map((h) => h[0]));
    }
    res.status(200).json({ PostId: parseInt(req.params.postId, 10), Content: req.body.content });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.patch('/:postId/like', isLoggedIn, async (req, res, next) => { // PATCH /post/${postId}/like
  try {
    const post = await Post.findOne({
      where: { id: req.params.postId }
    });
    if (!post) {
      return res.status(404).send('존재하지 않는 게시글입니다.');
    }
    await post.addLikers(req.user.id);
    res.status(200).json({ PostId: post.id, UserId: req.user.id });
  } catch (error) {
    console.error(error);
    next(error);
  }
}); 

router.delete('/:postId/like', isLoggedIn, async (req, res, next) => { // DELETE /post/${postId}/like
  try {
    const post = await Post.findOne({
      where: { id: req.params.postId }
    });
    if (!post) {
      return res.status(404).send('존재하지 않는 게시글입니다.');
    }
    await post.removeLikers(req.user.id);
    res.status(200).json({ PostId: post.id, UserId: req.user.id });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.get('/:postId', async (req, res, next) => { // GET /post/${postId}
  try {
    const post = await Post.findOne({
      where: { id: req.params.postId }
    });
    if (!post) {
      return res.status(404).send('존재하지 않는 게시글입니다.');
    }
    const fullPost = await Post.findOne({
      where: { id: post.id },
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
    res.status(200).json(fullPost);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.delete('/:postId', async (req, res, next) => { // DELETE /post/${postId}
  try {
    await Post.destroy({
      where: { id: req.params.postId }
    });

    res.status(200).json({ PostId: parseInt(req.params.postId, 10) });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
