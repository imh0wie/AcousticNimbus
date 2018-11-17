import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { fetchSongs } from "../../../../actions/song_actions";
import { latest } from "../../../../util/song_api_util";
import SongsRankingItem from "./songs_ranking_item";

const msp = (state) => {
  const songs = state.entities.songs;
  return {
    songs: state.ui.charts.order === "newest" && songs ? latest(20, songs) : null,
    currentUser: state.entities.users[state.session.id],
  };
};

const mdp = (dispatch) => {
  return ({
      fetchSongs: () => dispatch(fetchSongs()),
  });
};

class SongsRanking extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    }
  }

  componentDidMount() {
    this.props.fetchSongs();
    this.setState({
      loading: false,
    });
  }

  render() {
    if (!this.props.songs || this.state.loading) {
      return <img src={window.loadingPizza} className="loading"></img>
    }
    return (
      <ul className="songs-ranking">
        {this.props.songs.map((song, idx) => {
          return (
          <SongsRankingItem
            key={song.id}
            idx={idx}
            song={song}
          />
          );
        })}
      </ul>
    );
  }
}

export default withRouter(connect(msp, mdp)(SongsRanking));
