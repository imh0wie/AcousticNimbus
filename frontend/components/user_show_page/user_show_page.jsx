import React from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { fetchSongs } from "../../actions/song_actions";
import { setCurrentSong, playSong, pauseSong, setElapsedTo } from "../../actions/current_song_actions";
import { fetchLikes, createLike, removeLike } from "../../actions/like_actions";
import { fetchFollows, createFollow, removeFollow } from "../../actions/follow_actions";
import { fetchComments } from "../../actions/comment_actions";
import { fetchUsers } from "../../actions/user_actions";
import { songsOf } from "../../util/song_api_util";
import { followOf } from "../../util/follow_api_util";
import Slideshow from "../common_components/slideshow"
import Navbar from "../common_components/navbar";
import SocialElements from "../common_components/social_elements";
import SongsList from "../common_components/songs_list/songs_list";
const msp = (state, ownProps) => {
    const onPageArtistId = parseInt(ownProps.match.params.userId);
    const songs = state.entities.songs;
    const likes = state.entities.likes;
    const follows = state.entities.follows;
    const comments = state.entities.comments;
    const users = state.entities.users;
    const currentUserId = state.session.id;
    return ({
        onPageArtistId: onPageArtistId,
        onPageArtist: state.entities.users[onPageArtistId],
        users: users,
        likes: likes,
        comments: comments,
        currentSongs: songsOf(state.entities.users[onPageArtistId], songs),
        currentSong: state.ui.currentSong,
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
        fetchSongs: () => dispatch(fetchSongs()),
        setCurrentSong: (song) => dispatch(setCurrentSong(song)),
        playSong: () => dispatch(playSong()),
        pauseSong: () => dispatch(pauseSong()),
        setElapsedTo: (time) => dispatch(setElapsedTo(time)),
        fetchLikes: () => dispatch(fetchLikes()),
        createLike: (like) => dispatch(createLike(like)),
        removeLike: (id) => dispatch(removeLike(id)),
        fetchFollows: () => dispatch(fetchFollows()),
        createFollow: (follow) => dispatch(createFollow(follow)),
        removeFollow: (id) => dispatch(removeFollow(id)),
        fetchComments: () => dispatch(fetchComments()),
        fetchUsers: () => dispatch(fetchUsers()),
    });
};

class UserShowPage extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {

        // this.props.fetchSongs();
        // this.props.fetchLikes();
        this.props.fetchFollows();
        // this.props.fetchComments();
        this.props.fetchUsers();
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
                    <div className="content">
                        <div className="songs-list">
                            <SongsList  klass={"user-show-page"}
                                        users={this.props.users}
                                        likes={this.props.likes}
                                        comments={this.props.comments}
                                        currentSongs={this.props.currentSongs}
                                        currentUserId={this.props.currentUserId}
                                        currentUser={this.props.currentUser}
                                        currentSong={this.props.currentSong}
                                        fetchSongs={this.props.fetchSongs}
                                        setCurrentSong={this.props.setCurrentSong}
                                        playSong={this.props.playSong}
                                        pauseSong={this.props.pauseSong}
                                        setElapsedTo={this.props.setElapsedTo}
                                        fetchLikes={this.props.fetchLikes}
                                        createLike={this.props.createLike}
                                        removeLike={this.props.removeLike}
                                        fetchFollows={this.props.fetchFollows}
                                        fetchComments={this.props.fetchComments}
                                        fetchUsers={this.props.fetchUsers}
                            />
                        </div>
                        <div className="sidebar">
                        </div>
                    </div>
                </div>
            );
        } else {
            return <img src={window.loading5} className="user-show-loading"></img>
        }
        
    }
}

export default withRouter(connect(msp, mdp)(UserShowPage));