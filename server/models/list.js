module.exports = (sequelize, DataTypes) => {
  const Lists = sequelize.define('Lists', {
    id: {
      type: DataTypes.TEXT,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    listname: DataTypes.TEXT,
    listdetails: DataTypes.TEXT,
  }, {});

  Lists.associate = db => {
    Lists.belongsToMany(db.Favorites, {through: 'FavoritesLists', onDelete: "CASCADE", foreignKey: 'listId'});
  };

  // Lists.sync();

  return Lists;
};