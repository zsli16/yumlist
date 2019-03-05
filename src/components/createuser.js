import React from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import SharedList from './sharedlist';

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
          <h1>Join List</h1>

          <div className="copy-input">
            <input type="text" placeholder="Your Name" id="username" className="list-url" onChange={this.onChange} value={this.state.username} />
          </div>

          {/* <Link to={ {pathname: `/share/${this.props.listId}`}} >  */}
            <button className="go-there" onClick={this.handleClose} >Join List</button>
          {/* </Link> */}

          </div>
        </div>
          {/* <Route exact path={`/share/${this.props.listId}/${this.state.username}`} component={SharedList}/>   */}
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