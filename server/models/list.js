module.exports = (sequelize, DataTypes) => {
  const List = sequelize.define('List', {
    listname: DataTypes.STRING,
    eventdate: DataTypes.STRING,
    description: DataTypes.STRING,
  }, {});

  // List.associate = db => {
  //   db.List.hasMany(db.Restaurant, {as: 'restaurants', foreignKey: 'uid'});
  // };

  return List;
};