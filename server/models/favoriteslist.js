module.exports = (sequelize, DataTypes) => {
  const FavoritesLists = sequelize.define('FavoritesLists', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    listId: DataTypes.TEXT,
    favoriteId: DataTypes.TEXT
  }, {});
  
  // FavoritesLists.associate = db => {
  //   FavoritesLists.belongsToMany(db.Lists, {through: 'FavoritesLists', foreignKey: 'favoriteId'});
  // };

  // associate join table with the Favorites table and with the Lists table


  return FavoritesLists;
};