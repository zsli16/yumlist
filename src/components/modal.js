import React from 'react';
import PropTypes from 'prop-types';
import close from './../assets/close.png';
import { Link } from "react-router-dom";

class Modal extends React.Component {

  copyUrl = () => {
    const input = document.querySelector('.list-url');
    const iOSDevice = navigator.userAgent.match(/ipad|iphone/i);

    if (iOSDevice) {
      var editable = input.contentEditable;
      var readOnly = input.readOnly;

      input.contentEditable = true;
      input.readOnly = false;

      var range = document.createRange();
      range.selectNodeContents(input);

      var selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(range);

      input.setSelectionRange(0, 999999);
      input.contentEditable = editable;
      input.readOnly = readOnly;
    } else {
      input.select();
    }
    document.execCommand('copy');
    alert('Copied to clipboard! Your yumlist is ready to share with friends');
  }

  render() {
    const url = `http://${process.env.REACT_APP_LOCAL_URL}:3000/share/`;
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
          <p className="join-description">Send this link to your friends so they can give YUMS for their favorite restaurants!</p>
          <div className="copy-input">
            <input type="text" value={url + this.props.listId} className="list-url" readOnly={true} />
            <div className="copy-url" onClick={this.copyUrl}>Copy</div>
          </div>

          <p className="join-description">Or, want to vote on your own list?</p>
          <Link to={`/share/${this.props.listId}`}>
            <button className="go-there">Go to my Yumlist</button>
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