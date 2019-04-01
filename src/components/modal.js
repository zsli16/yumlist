import React from 'react';
import PropTypes from 'prop-types';
import close from './../assets/close.png';
import { Link } from "react-router-dom";

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
      <div className="backdrop">
        <div className="modal">
          <img src={close} className="close-button" onClick={this.props.onClose} alt="close-modal" width="20px" />
          <div className="modal-container">
          <h1>Share Your List</h1>

          <div className="copy-input">
            <input type="text" value={url + this.props.listId} className="list-url" readOnly={true} />
            <div className="copy-url" onClick={this.copyUrl}>Copy</div>
          </div>

          <Link to={`/share/${this.props.listId}`}>
            <button className="go-there">View List</button>
          </Link>

          </div>
        </div>
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