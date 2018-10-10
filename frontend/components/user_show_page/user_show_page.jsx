import React from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";

const msp = (state, ownProps) => {
    debugger
    return ({
      onPageUserId: ownProps.match.params.songId,
      onPageUser: state.entities.songs[ownProps.match.params.songId],
      currentSong: state.ui.currentSong,
      currentUser: state.entities.users[session.id],
      users: state.entities.users,
    });
  };
  
const mdp = (dispatch) => {
return ({
    fetchSongs: () => dispatch(fetchSongs()),
    fetchSong: (id) => dispatch(fetchSong(id)),
    setCurrentSong: (song) => dispatch(setCurrentSong(song)),
    playSong: (song) => dispatch(playSong(song)),
    pauseSong: (song) => dispatch(pauseSong(song)),
});
};

class UserShowPage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="user-show-page-container">
                <div className="user-show-page-banner">
                    <img className="user-show-page-user-img"></img>
                    <h2></h2>
                </div>
                <div className="user-show-page-content-container">
                    <div className="user-show-page-content-header">
                        <div className="user-show-page-nav-bar">
                        </div>
                        <div className="user-show-page-social-els-container">
                        </div>
                    </div>
                    <div className="user-show-page-content">
                        <div className="user-show-page-music">
                        </div>
                        <div className="user-show-page-sidebar">
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(msp, mdp)(UserShowPage);