import React from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import { login, logout } from "../../actions/session_actions";
import { openModal } from "../../actions/modal_actions";

const msp = (state, ownProps) => {
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
  }

  render() {
    if (!this.props.currentUser || this.props.currentURL === "/") {
      return null;
    } else {
      return (
        <header className="outer-bar">
          <div className="inner-bar">
            <Link to="/stream" ><img src={window.barLogo} className="logo" ></img></Link>
            <Link to="/stream"><button className={this.props.currentURL.indexOf("/stream") > -1 || this.props.currentURL.indexOf("/charts") > -1 ? "home selected" : "home"}>Home</button></Link>
            <span title="Page coming soon!"><Link to=""><button className={this.props.currentURL.indexOf("/you") > -1 ? "collection selected" : "collection"} >Collection</button></Link></span>
            <div className="search-bar-container">
              <input type="text" placeholder="Search" className="search-bar"></input>
            </div>
            <Link to="/upload"><button className={this.props.currentURL === "upload" ? "upload selected" : "upload"}>Upload</button></Link>
            <span title="Page coming soon!"><button className="profile-dropdown">
              <img src={window.user_dp}></img>
              <p>{this.props.currentUser.username}</p>
            </button></span>
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

