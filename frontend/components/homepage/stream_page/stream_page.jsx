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
import SongsList from "../../common_components/songs_list/songs_list";

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

class StreamPage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="stream-page-container">
        <h4 className="header">Hear the latest posts from the people you are following: </h4>
        <SongsList  klass={"stream-page"}
                    users={this.props.users}
                    likes={this.props.likes}
                    comments={this.props.comments}
                    streamSongs={this.props.streamSongs}
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
    );
  }
}

export default withRouter(connect(msp, mdp)(StreamPage));
