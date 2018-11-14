import React from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { setCurrentSong, playSong, pauseSong } from "../../../../actions/current_song_actions";

const msp = (state) => {
    return {
      currentSong: state.ui.currentSong,
    };
};

const mdp = (dispatch) => {
    return ({
        setCurrentSong: (song) => dispatch(setCurrentSong(song)),
        playSong: () => dispatch(playSong()),
        pauseSong: () => dispatch(pauseSong()),
    });
};

class SongsRankingItem extends React.Component {
    constructor(props) {
        super(props);
        // this.redirectToShowPage = this.redirectToShowPage.bind(this);
        this.togglePlay = this.togglePlay.bind(this);
        this.renderPlayPauseSign = this.renderPlayPauseSign.bind(this); 
    }
    
    togglePlay(song) {
        if (!this.props.currentSong.song || song.id !== this.props.currentSong.song.id ) {
            this.props.setCurrentSong(song);
            this.props.playSong();
        } else if (song.id === this.props.currentSong.song.id && this.props.currentSong.playing) {
            this.props.pauseSong();
        } else if (song.id === this.props.currentSong.song.id && !this.props.currentSong.playing) {
            this.props.playSong();
        }
    }

  renderPlayPauseSign(song) {
    if (!this.props.currentSong.song || song.id !== this.props.currentSong.song.id || !this.props.currentSong.playing) {
        return (
            <div className="charts-songs-list-item-play-container">
                <img src={window.play_button} className="charts-songs-list-item-play-sign" onClick={() => this.togglePlay(song)} />
            </div>
        );
    } else if (song.id === this.props.currentSong.song.id && this.props.currentSong.playing) {
        return (
            <div className="charts-songs-list-item-pause-container">
                <img src={window.pause_button} className="charts-songs-list-item-pause-sign" onClick={() => this.togglePlay(song)} />
            </div>
        );
    }
  }

  render() {
    return (
      <li>
        <p className={(this.props.idx + 1 >= 10) ? "double" : "single"}>{this.props.idx + 1}</p> 
        <div className="img-container">
            <img src={this.props.song.imageURL ? this.props.song.imageURL : window.song_dp } className="charts-songs-list-item-img" />
            {this.renderPlayPauseSign(this.props.song)}
        </div>
        <div className="song-info">
            <Link to={`/users/${this.props.song.artistId}`} className="artist">{this.props.song.artist}</Link>
            <Link to={`/songs/${this.props.song.id}`} className="title">
                {this.props.song.title.length >= 23 ? this.props.song.title.slice(0, 23) + "..." : this.props.song.title}
            </Link>
        </div>
      </li>
    );
  }
}

export default withRouter(connect(msp, mdp)(SongsRankingItem));
