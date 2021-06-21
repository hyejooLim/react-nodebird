module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', { 
    content: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {
    charset: 'utf8mb4',
    collate: 'utf8_general_cimb4' 
  });
  
  Comment.associate = (db) => {};
  return Comment;
};