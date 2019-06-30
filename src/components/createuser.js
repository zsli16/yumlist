import React from 'react';
import PropTypes from 'prop-types';

class CreateUserModal extends React.Component {
  
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      sendEnable: false
    }
  }

  handleClose = () => {
    if (this.state.sendEnable) {
      this.props.createUser(this.state.username);
    }
  }

  onChange = async (e) => {
    await this.setState({username: e.target.value});
    if (this.state.username) {
      this.setState({sendEnable: true})
    } else {
      this.setState({sendEnable: false})
    }
  }

  render() {

    // Render nothing if the "show" prop is false
    if(!this.props.show) {
      return null;
    }
    
    return (
      <div className="backdrop">
        <div className="modal">

          <div className="modal-container">
            <h3>You've been invited to {this.props.listDetails}'s yumlist:</h3>
            <h1>{this.props.listName}</h1>
            <p className="join-description">Vote for your favorite restaurants by clicking on the <span><button className="like-button">YUM!</button></span></p>

            <div className="copy-input" id="name-input">
              <input type="text" autoComplete="off" placeholder="What's your name?" id="username" className="list-url" onChange={this.onChange} value={this.state.username} />
            </div>
            <button className="go-there" disabled={!this.state.sendEnable} onClick={this.handleClose} >Join List</button>

          </div>
        </div>
      </div>



    );
  }
}

CreateUserModal.propTypes = {
  onClose: PropTypes.func,
  show: PropTypes.bool,
  children: PropTypes.node
};

export default CreateUserModal;