module.exports = (sequelize, DataTypes) => {
  const Votes = sequelize.define('Votes', {
    list: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    favorited: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    user: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {});

  Votes.removeAttribute('id');

  return Votes;
};