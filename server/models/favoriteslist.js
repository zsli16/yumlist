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
    score: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    }
  }, {});

  return FavoritesLists;
};