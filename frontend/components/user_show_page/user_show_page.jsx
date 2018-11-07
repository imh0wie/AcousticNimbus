import React from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { fetchUsers } from "../../actions/user_actions";
import { fetchFollows, createFollow, removeFollow } from "../../actions/follow_actions";
import { followOf } from "../../util/follow_api_util";
import Slideshow from "../common_components/slideshow"
import Navbar from "../common_components/navbar";
import SocialElements from "../common_components/social_elements";

const msp = (state, ownProps) => {
    const onPageArtistId = parseInt(ownProps.match.params.userId);
    const currentUserId = state.session.id;
    const follows = state.entities.follows;
    debugger
    return ({
      onPageArtistId: onPageArtistId,
      onPageArtist: state.entities.users[onPageArtistId],
      currentFollow: followOf(onPageArtistId, currentUserId, follows),
      currentUserId: currentUserId, 
      currentUser: state.entities.users[currentUserId], 
    //   currentSong: state.ui.currentSong,
    //   currentUser: state.entities.users[session.id],
    //   users: state.entities.users,
    });
  };
  
const mdp = (dispatch) => {
    return ({
        // fetchSongs: () => dispatch(fetchSongs()),
        // fetchSong: (id) => dispatch(fetchSong(id)),
        // setCurrentSong: (song) => dispatch(setCurrentSong(song)),
        // playSong: () => dispatch(playSong()),
        // pauseSong: () => dispatch(pauseSong()),
        fetchFollows: () => dispatch(fetchFollows()),
        createFollow: (follow) => dispatch(createFollow(follow)),
        removeFollow: (id) => dispatch(removeFollow(id)),
        fetchUsers: () => dispatch(fetchUsers()),
    });
};

class UserShowPage extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        debugger
        this.props.fetchUsers();
        this.props.fetchFollows();
    }

    render() {
        if (this.props.onPageArtist) {
            return (
                <div className="user-show-page">
                    <Slideshow klass="user-show-page" onPageArtist={this.props.onPageArtist} />
                    <div className="bar">
                        <Navbar klass="user-show-page" onPageArtistId={this.props.onPageArtistId} />
                        <SocialElements klass="user-show-page"
                                        onPageArtistId={this.props.onPageArtistId}
                                        currentUserId={this.props.currentUserId}
                                        currentFollow={this.props.currentFollow}
                                        createFollow={this.props.createFollow}
                                        removeFollow={this.props.removeFollow}
                        />
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
        } else {
            debugger
            return <img src={window.loading5} className="user-show-loading"></img>
        }
        
    }
}

export default withRouter(connect(msp, mdp)(UserShowPage));