const express = require('express');

const { Post, User, Image, Comment } = require('../models');

const router = express.Router();

router.get('/', async (req, res, next) => { // GET /posts
  try {
    const posts = await Post.findAll({
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
      }],
    });
    res.status(200).json(posts);
  } catch (error) {
    console.error(error)
    next(error);
  }
});

module.exports = router;
