import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
// import WaveformPlayer from "./waveform_player/waveform_player";

const msp = (state, ownProps) => {
  return ({
    songs: state.entities.songs,
    currentSong: state.ui.currentSong,
    currentUser: state.session.currentUser,
    track: state.entities.tracks[ownProps.match.params.trackId],
    playing: state.currentTrack.playing,
    users: state.entities.users
  });
};

const mdp = (dispatch) => {
  return ({
      fetchSongs: () => dispatch(fetchSongs()),
      setCurrentSong: (song) => dispatch(setCurrentSong(song)),
      playSong: (song) => dispatch(playSong(song)),
      pauseSong: (song) => dispatch(pauseSong(song)),
  });
};

class SongShowPage extends React.Component {
  constructor(props) {
    super(props);
    this.renderPlayPauseSign = this.renderPlayPauseSign.bind(this);
    this.togglePlay = this.togglePlay.bind(this);
  }

  renderPlayPauseSign(song) {
    if (!this.props.currentSong.song || song.id !== this.props.currentSong.song.id || !this.props.currentSong.playing) {
        return (
            <div className="banner-player-play-container">
                <img src={window.play_button} className="banner-player-play-sign" onClick={() => this.togglePlay(song)} />
            </div>
        );
    } else if (song.id === this.props.currentSong.song.id && this.props.currentSong.playing) {
        return (
            <div className="banner-player-pause-container">
                <img src={window.pause_button} className="banner-player-pause-sign" onClick={() => this.togglePlay(song)} />
            </div>
        );
    }
    debugger
  }

  togglePlay(song) {
    if (!this.props.currentSong.song || song.id !== this.props.currentSong.song.id ) {
        this.props.setCurrentSong(song);
        this.props.playSong(song);
    } else if (song.id === this.props.currentSong.song.id && this.props.currentSong.playing) {
        this.props.pauseSong(song);
    } else if (song.id === this.props.currentSong.song.id && !this.props.currentSong.playing) {
        this.props.playSong(song);
    }
}

  renderLikeButton() {

  }

  render() {
    debugger
    return (
      <div className="song-show-page-container">

        <div className="banner-player-container">
          <div className="banner-player">
            <div className="banner-player-left">
              {this.renderPlayPauseSign(this.props.song)}
              {/* <WaveformPlayer song={this.props.song} /> */}
              <div className="song-show-page-song-info-container">
                <h4 className="song-show-page-song-artist">{this.props.currentSong.song.artist}</h4>
                <h2 className="song-show-page-song-title">{this.props.currentSong.song.title}</h2>
              </div>
            </div>
            <div className="banner-player-right">
              <h4 className="song-show-page-song-upload-time"></h4>
              <h4 className="song-show-page-song-genre">#{this.props.currentSong.song.title}</h4>
            </div>
          </div>
          <img src="" className="song-show-page-song-img"></img>        
        </div>

        <div className="song-show-page-content">
          <div className="song-show-page-social-els-container">
            <div className="song-show-page-comment-box-container">
              <img className="song-show-page-comment-box-img"></img>
              <div className="song-show-page-comment-box-wrapper">
                <form>
                  <input type="text" name="comment" />
                  <input type="submit" style="position: absolute; left: -9999px; width: 1px; height: 1px;"tabindex="-1" />
                </form>
              </div>
              <div className="song-show-page-social-els">
                <div className="song-show-page-social-els-left">
                  <button className="song-show-page-like-button">Like</button>
                </div>
                <div className="song-show-page-social-els-right">
                </div>
              </div>
            </div>
            <div className="song-show-page-main-container">
              <div className="song-show-page-artist-info-container">
              </div>
              <div className="song-show-page-description-comments">
                <div className="song-show-page-description-container"></div>
                <div className="song-show-page-comments-container">
                
                </div>
              </div>
            </div>
          </div>
          <div className="song-show-page-sidebar">
          </div>
        </div>
      </div>
    );
  }
}

// {this.props.song.title}
// {this.props.song.genre}
// {this.props.song.description}
// {this.props.song.availability}
// <audio controls>
//   <source src="https://s3.amazonaws.com/acoustic-nimbus-fileupload-dev/AP6j3EYT7GuzuYYTtYobA5sw" type="audio/mpeg" />
// </audio>
export default withRouter(connect(msp, mdp)(SongShowPage));
