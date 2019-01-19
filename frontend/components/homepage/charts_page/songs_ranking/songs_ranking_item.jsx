import React from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { setCurrentSong, playSong, pauseSong } from "../../../../actions/current_song_actions";
import { createQueue, replaceQueue } from "../../../../actions/queue_actions";
import { songsByCreationDate } from "../../../../util/song_api_util";

const msp = (state) => {
    return {
        queue: state.entities.queue,
        currentSong: state.ui.currentSong,
    };
};

const mdp = (dispatch) => {
    return ({
        setCurrentSong: (song) => dispatch(setCurrentSong(song)),
        playSong: () => dispatch(playSong()),
        pauseSong: () => dispatch(pauseSong()),
        createQueue: (queue) => dispatch(createQueue(queue)),
        replaceQueue: (queue) => dispatch(replaceQueue(queue)),
    });
};

class SongsRankingItem extends React.Component {
    constructor(props) {
        super(props);
    }
    
    togglePlay(song) {
        if (!this.props.queue) {
            this.props.createQueue(songsByCreationDate(this.props.songs));
        } else if (this.props.queue && !this.props.queue.unshuffled.map(song => song.id).includes(this.props.songId)) {
            this.props.replaceQueue(songsByCreationDate(this.props.songs));
        }
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
