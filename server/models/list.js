module.exports = (sequelize, DataTypes) => {
  const Lists = sequelize.define('Lists', {
    id: {
      type: DataTypes.TEXT,
      primaryKey: true,
      allowNull: false
    },
    listname: DataTypes.TEXT,
    listdetails: DataTypes.TEXT,
    listlocation: DataTypes.TEXT,
  }, {});

  Lists.associate = db => {
    Lists.belongsToMany(db.Favorites, {through: 'FavoritesLists', onDelete: "CASCADE", foreignKey: 'listId'});
  };

  return Lists;
};