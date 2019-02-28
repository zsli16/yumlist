import React from 'react';

const FavoriteRestaurant = ({restaurant, removeFromList}) => {
  
  const removeRestaurant = () => {
    const restaurantId = restaurant.uid;
    removeFromList(restaurantId);
  }

    return (
      <div className="favorite-restaurant">
        <img className="favorite-icon" alt="favorite-restaurant"/>
        <div className="favorite-title">{restaurant.name}</div>
        <button className="deleteResult" onClick={removeRestaurant}>Remove</button>
      </div>
    )
  }

  export default FavoriteRestaurant;




