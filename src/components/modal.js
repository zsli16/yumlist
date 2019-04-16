import React from 'react';
import PropTypes from 'prop-types';
import close from './../assets/close.png';
import { Link } from "react-router-dom";

import facebook from './../assets/facebook.png';
import whatsapp from './../assets/whatsapp.png';
import messenger from './../assets/messenger.png';

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
    const url = `${process.env.REACT_APP_URL}/share/`;
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
          <p className="join-description">Send your Yumlist to friends on social media!</p>
          <div className="social">
            {/* <a href={`whatsapp://send?text=Vote%20on%20my%20yumlist!%20${url}`}><img src={whatsapp} alt="whatsapp"/></a> */}
            <a href={`whatsapp://send?text=Vote%20on%20my%20yumlist!%20${url}`}><img src={messenger} className="social-icon" alt="messenger" width="50px"/></a>
            <a href={`whatsapp://send?text=Vote%20on%20my%20yumlist!%20${url}`}><img src={whatsapp} className="social-icon" alt="whatsapp" width="50px"/></a>
            <a href={`whatsapp://send?text=Vote%20on%20my%20yumlist!%20${url}`}><img src={facebook} className="social-icon" alt="facebook" width="50px"/></a>
          </div>
          <p className="join-description">Or copy the link to clipboard:</p>
          <div className="copy-input">
            <input type="text" value={url + this.props.listId} className="list-url" readOnly={true} />
            <div className="copy-url" onClick={this.copyUrl}>Copy</div>
          </div>

          <p className="join-description">You can give your own YUMS too!</p>
          <Link to={`/share/${this.props.listId}`}>
            <button className="go-there">Vote on My Yumlist</button>
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