module.exports = (sequelize, DataTypes) => {
  const FavoritesLists = sequelize.define('FavoritesList', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    listId: DataTypes.INTEGER,
    favoriteId: DataTypes.TEXT
  }, {});


  return FavoritesLists;
};