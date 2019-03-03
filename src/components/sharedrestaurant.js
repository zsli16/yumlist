import React from 'react';

const SharedRestaurant = ({restaurant, voteForRestaurant, list}) => {
  
 
  const toggleVote = (restaurant) => {
    console.log('restaurantId', restaurant.id);
    console.log('listId', list);

    // TODO:
    // if button state is inactive, set :vote to up increase score
    // if button state is active, set :vote to decrease score

    // TODO: Finish writing fetch and pass in the parameters
    // fetch(`http://localhost:3000/${listId}/${restaurantId}/${vote}`, {
    //   method: 'PUT',
    //   headers: {
    //     'Content-Length': 0
    //   }
    // })

    // TODO: With response, call reducers to update the view
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
        
        <p id="current-votes">4</p>

        <button className="like-restaurant" onClick={() => toggleVote(restaurant)} >YUM</button>
      </div>
    </div>

  )
}

export default SharedRestaurant;


