import React from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import SharedList from './sharedlist';


class Modal extends React.Component {
  
  render() {
    // Render nothing if the "show" prop is false
    if(!this.props.show) {
      return null;
    }
    
    return (
      <div className="backdrop">
        <div className="modal">
          URL: {this.props.listId}
          <div className="footer">
            <Link to={{pathname: `/share/${this.props.listId}`}}> Go there </Link>        
            <button onClick={this.props.onClose}>
              Close
            </button>
          </div>
        </div>
      <Route exact path='/share/:listId' component={SharedList}/>  
      </div>

    );
  }
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  show: PropTypes.bool,
  children: PropTypes.node
};

export default Modal;