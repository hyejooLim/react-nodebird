module.exports = (sequelize, DataTypes) => {
  const Hashtag = sequelize.define('Hashtag', { 
    name: {
      type: DataTypes.STRING(20),
      allowNull: false
    }
  }, {
    charset: 'utf8mb4',
    collate: 'utf8_general_cimb4' 
  });
  
  Hashtag.associate = (db) => {
    db.Hashtag.belongsToMany(db.Post);
  };
  return Hashtag;
};