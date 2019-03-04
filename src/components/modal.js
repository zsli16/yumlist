import React from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import SharedList from './sharedlist';
import close from './../assets/close.png';

class Modal extends React.Component {
  
  copyUrl = () => {
    const toCopy = document.querySelector('.list-url');
    toCopy.select();
    document.execCommand('copy');
    alert('copied to clipboard!' + toCopy.value);
  }
  render() {

    const url = 'http://localhost:3000/share/';

    // Render nothing if the "show" prop is false
    if(!this.props.show) {
      return null;
    }
    
    return (
      <Router>

      <div className="backdrop">
        <div className="modal">
          <img src={close} className="close-button" onClick={this.props.onClose} alt="close-modal" width="20px" />
          <div className="modal-container">
          <h1>Share Your List</h1>

          <div class="copy-input">
            <input type="text" value={url + this.props.listId} className="list-url" readOnly="true"/>
            <div className="copy-url" onClick={this.copyUrl}>Copy</div>
          </div>

          <Link to={{pathname: `/share/${this.props.listId}`}}> 
            <button className="go-there">View List</button>
          </Link>  

          </div>
        </div>

      <Route path='/share/:listId' component={SharedList}/>  

      </div>

      </Router>

    );
  }
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  show: PropTypes.bool,
  children: PropTypes.node
};

export default Modal;