import React from 'react';
import PropTypes from 'prop-types';

class CreateUserModal extends React.Component {
  
  constructor(props) {
    super(props)
    this.state = {
      username: '',
    }
  }

  handleClose = () => {
    this.props.createUser(this.state.username);
  }

  onChange = (e) => {
    this.setState({username: e.target.value}, ()=> console.log('username changed to', this.state.username))
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
            <p className="join-description">Vote for your favorite restaurants. Decide where to eat with your friends! Ready?</p>

            <div className="copy-input" id="name-input">
              <input type="text" autoComplete="off" placeholder="What's your name?" id="username" className="list-url" onChange={this.onChange} value={this.state.username} />
            </div>
            <button className="go-there" onClick={this.handleClose} >Join List</button>

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