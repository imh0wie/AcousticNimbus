import React from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import { emptyFollowedSongs } from "../../actions/song_actions";
import { login, logout } from "../../actions/session_actions";
import { openModal } from "../../actions/modal_actions";

const msp = (state, ownProps) => {
  return {
    song: state.entities.songs,
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
    emptyFollowedSongs: (defaultState) => dispatch(emptyFollowedSongs(defaultState))
  };
};

class HeaderBar extends React.Component {
  constructor(props) {
    super(props);
  }
  
  goToHomepage() {
    const defaultState = {
      followedSongs: null,
      likedSongs: this.props.songs ? this.props.songs.likedSongs : null,
      songsOfSpecificUser: this.props.songs ? this.props.songs.songsOfSpecificUser : null,
      likedSongsOfSpecificUser: this.props.songs ? this.props.songs.likedSongsOfSpecificUser : null,
      individualSong: this.props.songs ? this.props.songs.individualSong : null,
      relatedSongsByGenre: this.props.songs ? this.props.songs.relatedSongsByGenre : null,
    };
    this.props.emptyFollowedSongs(defaultState);
  }
  
  render() {
    if (!this.props.currentUser) {
      return null;
    } else {
      return (
        <header className="outer-bar">
          <div className="inner-bar">
            <Link to="/stream" onClick={() => this.goToHomepage()}><img src={window.barLogo} className="logo" ></img></Link>
            <Link to="/stream" onClick={() => this.goToHomepage()}><button className={this.props.currentURL.indexOf("/stream") > -1 || this.props.currentURL.indexOf("/charts") > -1 ? "home selected" : "home"}>Home</button></Link>
            {/* <span title="Page coming soon!"><Link to=""><button className={this.props.currentURL.indexOf("/you") > -1 ? "collection selected" : "collection"} >Collection</button></Link></span> */}
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

