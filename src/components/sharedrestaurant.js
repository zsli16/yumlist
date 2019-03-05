import React from 'react';
import emoji from './../assets/emoji-icon.png';

class SharedRestaurant extends React.Component  {
  
  state = {
    voted : false,
    url : 'http://sues-macbook-pro.local:3001'
  }

  toggleVote = async (restaurant, username, list) => {
    await this.setState({voted: !this.state.voted}, () => console.log(this.state.voted, 'toggledVote'));

    if (this.state.voted) {
      console.log(this.state.voted, 'inside of if statement')
      fetch(`${this.state.url}/addvote`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "listId": list,
          "restaurantId": restaurant.id,
          "username": username
        })
      })
    } else {
      fetch(`${this.state.url}/removevote`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "listId": list,
          "restaurantId": restaurant.id,
          "username": username
        })
      })
    }

  }


render () {
  const {restaurant, list, username} = this.props;
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
        <div className="favorite-rating">Review Score: {restaurant.rating} <span className="favorite-reviewcount">Reviewed by: {restaurant.review_count} People</span></div>
        
        <p id="current-votes">{restaurant.score} Yums </p>
        {console.log('this.state.voted', this.state.voted)}
        { this.state.voted
          ? <img src={emoji} alt="emoji"/> 
          : null
        }
        <button className="like-restaurant" onClick={() => this.toggleVote(restaurant, username, list)}>ADD YUM</button>
      </div>
    </div>
    )
  }
}

export default SharedRestaurant;


