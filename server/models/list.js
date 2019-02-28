module.exports = (sequelize, DataTypes) => {
  const Lists = sequelize.define('Lists', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    listname: DataTypes.STRING,
    listdetails: DataTypes.STRING,
  }, {});

  Lists.associate = db => {
    db.Lists.belongsToMany(db.Favorites, {as: 'Favorites', through: 'FavoritesLists', foreignKey: 'id'});
  };

  return Lists;
};