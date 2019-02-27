module.exports = (sequelize, DataTypes) => {
  const Favorite = sequelize.define('Favorite', {
    uid: {
      type: DataTypes.STRING,
      primaryKey: true,
      autoIncrement: false,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    image_url: {
      type: DataTypes.STRING,
      allowNull: true
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    price: {
      type: DataTypes.STRING,
      allowNull: false
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false
    },
    review_count: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
}, {});


  // Restaurant.associate = db => {
  //   db.Restaurant.belongsTo(db.List, {
  //     onDelete: 'CASACADE',
  //     foreignKey: {allowNull: false}
  //   });
  // };
  
  return Favorite;
}

