import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { fetchSongs } from "../../../actions/song_actions";
import { setCurrentSong, playSong, pauseSong, setElapsedTo } from "../../../actions/current_song_actions";
import { fetchLikes, createLike, removeLike } from "../../../actions/like_actions";
import { fetchFollows } from "../../../actions/follow_actions";
import { fetchComments } from "../../../actions/comment_actions";
import { fetchUsers } from "../../../actions/user_actions";
import { followedUsersOf, followedSongs} from "../../../util/follow_api_util";
import { likesOf, likeOf } from "../../../util/like_api_util";
import { commentsOf } from "../../../util/comment_api_util";
import SongsListItem from "./songs_list_item";

const msp = (state) => {
    const songs = state.entities.songs;
    const likes = state.entities.likes;
    const follows = state.entities.follows;
    const comments = state.entities.comments;
    const users = state.entities.users;
    const currentUserId = state.session.id;
    const followedArtists = followedUsersOf(state.entities.users[currentUserId], follows, users);
    return {
        users: users,
        likes: likes,
        comments: comments,
        streamSongs: followedSongs(followedArtists, songs),
        currentUserId: currentUserId,
        currentUser: state.entities.users[currentUserId],
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


class SongsList extends React.Component {
    constructor(props) {
        super(props);
    }
    
    componentDidMount() {
        this.props.fetchSongs();
        this.props.fetchLikes();
        this.props.fetchComments();
        if (this.props.klass !== "user-show-page") {
            // debugger
            this.props.fetchFollows();
            this.props.fetchUsers();
        }
    }

    render() {
        switch (this.props.klass) {
            case "stream-page":
                this.songs = this.props.streamSongs;
                break;
            case "user-show-page":
                this.songs = this.props.currentSongs;                
                break;
            default:
                break;
        }
        // debugger
        if (!this.songs) {
            // debugger
            return <img src={window.loading5} className="loading"></img>;
        } else {
            if (this.songs.length === 0) {
                // debugger
                if (this.props.klass === "user-show-page") return <img src={window.loading5} className="loading"></img>; 
                // debugger
                return <p>Stream is currently empty. Use Charts to find music & audio to listen to.</p>
            } else {
                return (
                    <ul>
                        {this.songs.map((song, idx) => {
                            return (
                                <SongsListItem
                                key={song.id}
                                idx={idx}
                                klass={this.props.klass}
                                itemSong={song}
                                itemLikes={likesOf("Song", song.id, this.props.likes)}
                                itemComments={commentsOf(song.id, this.props.comments)}
                                itemArtist={this.props.users[song.artistId]}
                                currentSong={this.props.currentSong}
                                currentLike={likeOf("Song", song.id, this.props.currentUser, this.props.likes)}
                                currentUser={this.props.currentUser}
                                currentUserId={this.props.currentUserId}
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

export default withRouter(connect(msp, mdp)(SongsList));
