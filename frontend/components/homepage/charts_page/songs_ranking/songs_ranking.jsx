import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { fetchSongs } from "../../../../actions/song_actions";
import { setCurrentSong, playSong, pauseSong } from "../../../../actions/current_song_actions";
import { latest } from "../../../../util/song_api_util";
import SongsRankingItem from "./songs_ranking_item";

const msp = (state) => {
  return {
    songs: state.entities.songs,
    currentUser: state.entities.users[state.session.id],
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

class SongsRanking extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.fetchSongs();
  }

  render() {
    let songs = latest(20, this.props.songs);
    if (this.props.order === "topTwenty") {
      return <div></div>;
    }
    return (
      <div className="charts-songs-list-container">
        <ul className="charts-songs-list">
          {songs.map((song, idx) => {
            return (
            <SongsRankingItem
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
      </div>
    );
  }
}

export default withRouter(connect(msp, mdp)(SongsRanking));
