module.exports = (sequelize, DataTypes) => {
  const FavoritesLists = sequelize.define('FavoritesLists', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    listId: DataTypes.TEXT,
    favoriteId: DataTypes.TEXT,
    score: DataTypes.INTEGER
  }, {});

  return FavoritesLists;
};