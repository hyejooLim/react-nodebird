module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define('Post', { 
    content: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    // UserId
    // RetweetId
  }, {
    charset: 'utf8mb4',
    collate: 'utf8mb4_general_ci' // 이모티콘 저장
  });
  
  Post.associate = (db) => {
    db.Post.belongsTo(db.User); // post.addUser, post.getUser, post.setUser
    db.Post.hasMany(db.Comment); // post.addComments
    db.Post.hasMany(db.Image); // post.addImages
    db.Post.belongsToMany(db.Hashtag, { through: 'PostHashtag' }); // post.addHashtags
    db.Post.belongsTo(db.Post, { as: 'Retweet' }); // post.addRetweet
    db.Post.belongsToMany(db.User, { through: 'Like', as: 'Likers' }); // post.addLikers, post.removeLikers
  };
  return Post;
};