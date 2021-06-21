module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define('Post', { 
    content: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    // RetweetId
  }, {
    charset: 'utf8mb4',
    collate: 'utf8_general_cimb4' // 이모티콘 저장
  });
  
  Post.associate = (db) => {
    db.Post.belongsTo(db.User);
    db.Post.hasMany(db.Comment);
    db.Post.hasMany(db.Image);
    db.Post.belongsToMany(db.Hashtag);
    db.Post.belongsTo(db.Post, { as: 'Retweet' });
    db.Post.belongsToMany(db.User, { through: 'Like', as: 'Likers' });
  };
  return Post;
};