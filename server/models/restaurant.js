module.exports = (sequelize, DataTypes) => {
  const Restaurant = sequelize.define('Favorite', {
    id: {
      type: DataTypes.STRING,
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
      type: DataTypes.NUMBER,
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
      type: DataTypes.NUMBER,
      allowNull: false
    }
}, {});


  Restaurant.associate = db => {
    db.Restaurant.belongsTo(db.List, {
      onDelete: 'CASACADE',
      foreignKey: {allowNull: false}
    });
  };
  
  return Restaurant;
}

