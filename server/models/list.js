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
    Lists.belongsToMany(db.Favorites, {through: 'FavoritesLists', foreignKey: 'listId'});
  };

  return Lists;
};