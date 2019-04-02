import React from 'react';
import PropTypes from 'prop-types';
import close from './../assets/close.png';
import { Link } from "react-router-dom";

class VotesSubmitted extends React.Component {

  render() {

    // Render nothing if the "show" prop is false
    if(!this.props.show) {
      return null;
    }
    
    return (
      <div className="backdrop">
        <div className="modal">
          <img src={close} className="close-button" onClick={this.props.onClose} alt="close-modal" width="20px" />
          <div className="modal-container">
          <h1>Thanks for Voting!</h1>
          <h3>Your votes have been saved successfully in your friend's list.</h3>
          
          <p className="join-description">What would you like to do now?</p>

          <Link to={`/view/${this.props.listId}`}> 
            <button className="go-there">View Results</button>
          </Link> 

          <p className="join-description">or</p>

          <Link to='/create'> 
            <button className="go-there">Make My Own Yumlist</button>
          </Link> 

           

          </div>
        </div>
      </div>

    );
  }
}

VotesSubmitted.propTypes = {
  onClose: PropTypes.func.isRequired,
  show: PropTypes.bool,
  children: PropTypes.node
};

export default VotesSubmitted;