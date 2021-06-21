module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', { 
    content: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    // UserId,
    // PostId
  }, {
    charset: 'utf8mb4',
    collate: 'utf8_general_cimb4' 
  });
  
  Comment.associate = (db) => {
    db.Comment.belongsTo(db.User);
    db.Comment.belongsTo(db.Post);
  };
  return Comment;
};