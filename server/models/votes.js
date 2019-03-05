module.exports = (sequelize, DataTypes) => {
  const Votes = sequelize.define('Votes', {
    // id: {
    //   type: DataTypes.TEXT,
    //   primaryKey: true,
    //   // autoIncrement: true,
    //   allowNull: false
    // },
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