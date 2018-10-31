import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { fetchSongs } from "../../../../actions/song_actions";
import { setCurrentSong, playSong, pauseSong } from "../../../../actions/current_song_actions";
import { latest } from "../../../../util/song_api_util";
import { followedUsersOf, followingsOf } from "../../../../util/follow_api_util";
import SongsListItem from "./songs_list_item";

const msp = (state) => {
    const songs = state.entities.songs;
    const follows = state.entities.follows;
    const users = state.entities.users;
    const currentUser = state.entities.users[state.session.id];
    return {
        followings: followingsOf(currentUser, follows),
        streamSongs: followedUsersOf(currentUser, follows, users),
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
  });
};

class StreamList extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.fetchSongs();
  }

  render() {
    if (!this.props.followings) {
        return <img src={window.loading2}></img>;
    } else {
        if (this.props.streamSongs.length === 0) {
            return <p>Stream is currently empty. Use Charts to find music & audio to listen to.</p>
        } else {
            return (
                <ul className="stream-list">
                    {this.props.streamSongs.map((song, idx) => {
                        return (
                        <SongsListItem
                        key={song.id}
                        idx={idx}
                        song={song}
                        currentSong={this.props.currentSong}
                        setCurrentSong={this.props.setCurrentSong}
                        playSong={this.props.playSong}
                        pauseSong={this.props.pauseSong}
                        />
                        );
                    })}
                </ul>
              );
        }
    }
}

export default withRouter(connect(msp, mdp)(StreamList));
