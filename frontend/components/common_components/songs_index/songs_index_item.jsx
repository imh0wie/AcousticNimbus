import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { setCurrentSong, playSong, pauseSong } from "../../../actions/current_song_actions";

const msp = (state) => {
    return ({
        currentSong: state.ui.currentSong,
    })
}

const mdp = (dispatch) => {
    return ({
        setCurrentSong: (song) => dispatch(setCurrentSong(song)),
        playSong: () => dispatch(playSong()),
        pauseSong: () => dispatch(pauseSong()),
    })
}

class SongsIndexItem extends React.Component {
    constructor(props) {
        super(props);
        this.renderPlayPauseSign = this.renderPlayPauseSign.bind(this); 
        this.togglePlay = this.togglePlay.bind(this);
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
                <div className="play-sign-container">
                    <img src={window.play_button} className="play-sign" onClick={() => this.togglePlay(song)} />
                </div>
            );
        } else if (song.id === this.props.currentSong.song.id && this.props.currentSong.playing) {
            return (
                <div className="pause-sign-container">
                    <img src={window.pause_button} className="pause-sign" onClick={() => this.togglePlay(song)} />
                </div>
            );
        }
      }
    
      render() {
        return (
          <li className="songs-index-item">
            <div className="img-container">
                <img src={this.props.song.imageURL ? this.props.song.imageURL : window.song_dp } className="splash-song-img" />
                {this.renderPlayPauseSign(this.props.song)}
            </div>
            <h4 className="title">
              {this.props.song.title.length >= 23 ? this.props.song.title.slice(0, 23) + "..." : this.props.song.title}
            </h4>
            <p className="artist">{this.props.song.artist}</p>
          </li>
        );
    }
    
}

export default withRouter(connect(msp, mdp)(SongsIndexItem));