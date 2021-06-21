module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define('Post', { 
    content: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {
    charset: 'utf8mb4',
    collate: 'utf8_general_cimb4' // 이모티콘 저장
  });
  
  Post.associate = (db) => {};
  return Post;
};