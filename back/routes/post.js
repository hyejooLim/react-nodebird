const express = require('express');

const { Post, Comment, User, Image } = require('../models');
const { isLoggedIn } = require('./middlewares');

const router = express.Router();

router.post('/', isLoggedIn, async (req, res, next) => { // POST /post
  try {
    const post = await Post.create({
      content: req.body.content,
      UserId: req.user.id
    });
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
      }]
    });

    res.status(201).json(fullPost);
  } catch (error) {
    console.error(error);
    next(error);
  }
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

router.delete('/', (req, res) => { // DELETE /post
  res.json({ id: 1, content: 'hello' });
});

module.exports = router;
