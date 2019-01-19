import React from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import { login, logout } from "../../actions/session_actions";

const msp = (state, ownProps) => {
  return {
    currentUser: state.entities.users[state.session.id],
    currentURL: ownProps.location.pathname,
  };
};

const mdp = (dispatch) => {
  return {
    login: (user) => dispatch(login(user)),
    logout: () => dispatch(logout()),
  };
};

class HeaderBar extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    if (!this.props.currentUser) {
      return null;
    } else {
      return (
        <header className="outer-bar">
          <div className="inner-bar">
            <Link to="/stream"><img src={window.barLogo} className="logo" ></img></Link>
            <Link to="/stream"><button className={this.props.currentURL.indexOf("/stream") > -1 || this.props.currentURL.indexOf("/charts") > -1 ? "home selected" : "home"}>Home</button></Link>
            <div className="search-bar-container">
              <input type="text" placeholder="Search (Disabled)" className="search-bar"></input>
            </div>
            <Link to="/upload"><button className={this.props.currentURL === "upload" ? "upload selected" : "upload"}>Upload</button></Link>
            <Link to={`/users/${this.props.currentUser.id}`}><button className="profile-dropdown">
              <img src={window.user_dp}></img>
              <p>{this.props.currentUser.username}</p>
            </button></Link>
            <button className="logout-button" onClick={() => this.props.logout()}>Sign Out</button>
          </div>
        </header>
      );
    }
  }
}

export default withRouter(connect(msp, mdp)(HeaderBar));

