import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { fetchFilteredSongs } from "../../../../actions/song_actions";
import { latest } from "../../../../util/song_api_util";
import SongsRankingItem from "./songs_ranking_item";
import { timingSafeEqual } from "crypto";

const msp = (state) => {
  const filters = state.ui.charts;
  return {
    songs: state.entities.songs,
    currentUser: state.entities.users[state.session.id],
    order: filters.order,
    genre: filters.genre,
  };
};

const mdp = (dispatch) => {
  return ({
    fetchFilteredSongs: (data) => dispatch(fetchFilteredSongs(data)),
  });
};

class SongsRanking extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rankedSongs: null,
      loading: true,
      offset: 0,
      limit: 30,
    }
  }

  componentDidMount() {
    const data = {
      number: 10,
      // offset: this.state.offset,
      order: this.props.order,
      genre: this.props.genre,
    }
    this.props.fetchFilteredSongs(data);
    this.setState({
      loading: false,
    });
  }

  componentWillReceiveProps(nextProps) {
    debugger
    if (((!this.props.songs || !this.props.songs.rankedSongs) && nextProps.songs && nextProps.songs.rankedSongs) || (this.props.songs && this.props.songs.rankedSongs && nextProps.songs && Object.keys(this.props.songs.rankedSongs).length !== Object.keys(nextProps.songs.rankedSongs).length)) {
      debugger
      this.setState({
        rankedSongs: Object.values(nextProps.songs.rankedSongs).reverse(),
        loading: false,
      });
    } else if (this.props.genre !== nextProps.genre) {
      this.setState({
        rankedSongs: null,
        loading: true,
      });
      const data = {
        number: 10,
        // offset: this.state.offset,
        order: nextProps.order,
        genre: nextProps.genre,
      }
      debugger
      this.props.fetchFilteredSongs(data);
    }
  }

  render() {
    if (this.state.loading || !this.state.rankedSongs) {
      return <img src={window.loadingPizza} className="loading"></img>
    } else {
      if (this.state.rankedSongs.length === 0) {
        return <p className="ui-msg">There are currently no songs on Acoustic Nimbus :(</p>;
      } else {
        return (
          <ul className="songs-ranking">
            {this.state.rankedSongs.map((song, idx) => {
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
  }
}

export default withRouter(connect(msp, mdp)(SongsRanking));
