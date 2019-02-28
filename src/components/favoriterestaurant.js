import React from 'react';

const FavoriteRestaurant = ({restaurant, removeFromList}) => {
  
  const removeRestaurant = () => {
    const restaurantId = restaurant.id;

    fetch(`http://localhost:3001/removefromfavorites/${restaurantId}`, {
      method: 'DELETE',
    })
    .then(res => res.json())
    .then(res => {
      removeFromList(res.id);  
    });
  }

    return (
      <div className="favorite-restaurant">
        <div className="favorite-left">
          <img src={restaurant.image_url} className="favorite-photo" alt="favorite-restaurant"/>
        </div>
        <div className="favorite-main">
          <div className="favorite-title">{restaurant.name}<span className="favorite-price">({restaurant.price})</span></div>
          <p></p>
          <a href={restaurant.url} className="favorite-url">View More</a>
        </div>
        <div className="favorite-right">
          <div className="favorite-rating">{restaurant.rating}<span className="favorite-reviewcount">{restaurant.review_count}</span></div>
          <p></p>
          <button className="deleteResult" onClick={removeRestaurant}>Remove</button>
        </div>
      </div>
    )
  }

  export default FavoriteRestaurant;


