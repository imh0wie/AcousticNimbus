import React from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import { login, logout } from "../../actions/session_actions";
import { openModal } from "../../actions/modal_actions";

const msp = (state, ownProps) => {
  debugger
  return {
    currentUser: state.entities.users[state.session.id],
    // currentURL: ownProps.history.location.pathname,
    currentURL: ownProps.location.pathname,
  };
};

const mdp = (dispatch) => {
  return {
    login: (user) => dispatch(login(user)),
    logout: () => dispatch(logout()),
    openModal: (modal) => dispatch(openModal(modal)),
  };
};

class HeaderBar extends React.Component {
  constructor(props) {
    super(props);
    debugger
  }

  render() {
    debugger
    if (!this.props.currentUser || this.props.currentURL === "/") {
      debugger
      return null;
    } else {
      debugger
      return (
        <header className="page-outer-bar">
          <div className="page-inner-bar">
            <Link to="/stream" ><img className="stream-logo" src={window.barLogo} ></img></Link>
            <Link to="/stream"><button className="bar-home">Home</button></Link>
            <Link to="/you/collection"><button className="bar-collection" >Collection</button></Link>
            <div className="search-bar-container">
              <input type="text" placeholder="Search" className="search-bar"></input>
            </div>
            <Link to="/upload"><button className="upload-button">Upload</button></Link>
            <button className="profile-dropdown" onClick={() => this.props.history.push(`/users/${this.props.currentUser.id}`)}>
              <img className="profile-dropdown-img" src={window.default_avatar}></img>
              <p className="profile-dropdown-username">{this.props.currentUser.username}</p>
            </button>
            <button className="logout-button" onClick={() => this.props.logout()}>Sign Out</button>
          </div>
        </header>
      );
    }
  }
}

// <iframe src="https://giphy.com/embed/wsWcsrfMXjJgk" width="480" height="264" frameBorder="0" className="giphy-embed" allowFullScreen></iframe>
// <img src="slideshow-img1.jpg" alt="img1" className="header-background"></img>
// <img src="images/header-background.gif" alt="header-background" className="header-background"></img>
export default withRouter(connect(msp, mdp)(HeaderBar));

