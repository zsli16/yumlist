import React from 'react';
import emoji from './../assets/emoji-icon.png';
import trash from './../assets/trash.png';

const FavoriteRestaurant = ({restaurant, removeFromList, list, score}) => {
  
  const removeRestaurant = (restaurant) => {
    const restaurantId = restaurant.id;
    console.log(restaurantId);
    fetch(`http://localhost:3001/removefromfavorites/${list}/${restaurantId}`, {
      method: 'DELETE'
    })
    .then(removeFromList(restaurantId))
  }

  let file;
  if (restaurant.rating % 1 === 0) {
    file = restaurant.rating
  } else {
    file = Math.floor(restaurant.rating) + '_half';
  }

  let voted;
  if (restaurant.score > 0) {
    voted = <div><p class="yum-score">{restaurant.score}</p><img src={emoji} alt="emoji" width="40px" className="emoji"/></div>;
  } else {
    voted = null;
  }

    return (
      
      <div className="favorite-restaurant">
        <div className="favorite-left">
          <img src={restaurant.image_url} className="favorite-photo" alt="favorite-restaurant"/>
        </div>
        <div className="favorite-main">
          <div className="favorite-title">{restaurant.name} <span className="favorite-price"> ({restaurant.price})</span></div>
          <p></p>
          <a href={restaurant.url} className="favorite-url">View More</a>
        </div>
        <div className="favorite-right">
          <div className="favorite-rating"><img src={require(`../ratings/large/large_${file}.png`)} alt="yelp-rating" id="yelp-rating"/><span className="favorite-reviewcount"> {restaurant.review_count} Reviews</span></div>
          <div className="total-yums">{voted}</div>
          <div><button className="deleteResult" onClick={() => removeRestaurant(restaurant)}><img src={trash} alt="delete-restaurant" width="25px"/></button></div>
        </div>
      </div>
    )
  }

  export default FavoriteRestaurant;


