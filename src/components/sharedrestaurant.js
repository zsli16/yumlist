import React from 'react';
import emoji from './../assets/emoji-icon.png';

class SharedRestaurant extends React.Component  {

  state = {
    voted : false,
    url : 'http://localhost:3001',
    showEmoji: ''
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

  let file;
  if (restaurant.rating % 1 === 0) {
    file = restaurant.rating
  } else {
    file = Math.floor(restaurant.rating) + '_half';
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
        <div className="favorite-rating"><img src={require(`../ratings/large/large_${file}.png`)} alt="yelp-rating" id="yelp-rating"/><div className="favorite-reviewcount"> {restaurant.review_count} Reviews </div></div>

        <div>
          {/* <p id="current-votes">{restaurant.score} Yums </p> */}
          { this.state.voted
            ? <img src={emoji} alt="emoji" width="45px" className="emoji"/>
            : null
          }
          <div>
            <button className="like-button" onClick={() => this.toggleVote(restaurant, username, list)}>YUM!</button>
          </div>
        </div>
      </div>
    </div>
    )
  }
}

export default SharedRestaurant;


