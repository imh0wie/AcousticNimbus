import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { fetchSongs } from "../../../../actions/song_actions";
import { setCurrentSong, playSong, pauseSong, setElapsedTo } from "../../../../actions/current_song_actions";
import { fetchLikes, createLike, removeLike } from "../../../../actions/like_actions";
import { fetchFollows } from "../../../../actions/follow_actions";
import { fetchComments } from "../../../../actions/comment_actions";
import { fetchUsers } from "../../../../actions/user_actions";
import { likesOf, likeOf } from "../../../../util/like_api_util";
import { followedUsersOf, followedSongs} from "../../../../util/follow_api_util";
import { commentsOf } from "../../../../util/comment_api_util";
import StreamListItem from "./stream_list_item";
import { songsOf } from "../../../../util/song_api_util"

const msp = (state) => {
    const songs = state.entities.songs;
    const likes = state.entities.likes;
    const follows = state.entities.follows;
    const comments = state.entities.comments;
    const users = state.entities.users;
    const currentUser = state.entities.users[state.session.id];
    const followedArtists = followedUsersOf(currentUser, follows, users);
    return {
        users: users,
        likes: likes,
        comments: comments,
        // followings: followingsOf(currentUser, follows),
        streamSongs: followedSongs(followedArtists, songs),
        currentUser: currentUser,
        currentSong: state.ui.currentSong,
    };
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
      fetchComments: () => dispatch(fetchComments()),
      fetchUsers: () => dispatch(fetchUsers()),
  });
};

class StreamList extends React.Component {
    constructor(props) {
        super(props);
        // this.state = {
        //     loaded: false,
        // }
    }
    // componentWillMount() {
        
    // }
    componentDidMount() {
        this.props.fetchSongs();
        this.props.fetchLikes();
        this.props.fetchFollows();
        this.props.fetchComments();
        this.props.fetchUsers();
    }

    render() {
        if (!this.props.streamSongs) {
            return <img src={window.loading2} className="loading"/>;
        } else {
            if (this.props.streamSongs.length === 0) {
                return <p>Stream is currently empty. Use Charts to find music & audio to listen to.</p>
            } else {
                debugger
                return (
                    <ul className="stream-list">
                        {this.props.streamSongs.map((song, idx) => {
                            return (
                                <StreamListItem
                                key={song.id}
                                idx={idx}
                                itemSong={song}
                                itemLikes={likesOf("Song", song.id, this.props.likes)}
                                itemComments={commentsOf(song.id, this.props.comments)}
                                itemArtist={this.props.users[song.artistId]}
                                currentSong={this.props.currentSong}
                                currentLike={likeOf("Song", song.id, this.props.currentUser, this.props.likes)}
                                currentUser={this.props.currentUser}
                                setCurrentSong={this.props.setCurrentSong}
                                playSong={this.props.playSong}
                                pauseSong={this.props.pauseSong}
                                setElapsedTo={this.props.setElapsedTo}
                                createLike={this.props.createLike}
                                removeLike={this.props.removeLike}
                                />
                            );
                        })}
                    </ul>
                );
            }
        }
    }
}

export default withRouter(connect(msp, mdp)(StreamList));
