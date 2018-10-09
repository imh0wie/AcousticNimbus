import React from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { fetchSongs, fetchSong } from "../../actions/song_actions";
import { setCurrentSong, playSong, pauseSong } from "../../actions/current_song_actions";
// import { latest } from "../../util/song_api_util";
// import WaveformPlayer from "./waveform_player/waveform_player";

const msp = (state, ownProps) => {
  debugger
  return ({
    onPageSongId: ownProps.match.params.songId,
    onPageSong: state.entities.songs[ownProps.match.params.songId],
    currentSong: state.ui.currentSong,
    currentUser: state.session.currentUser,
    users: state.entities.users,
  });
};

const mdp = (dispatch) => {
  return ({
      fetchSongs: () => dispatch(fetchSongs()),
      fetchSong: (id) => dispatch(fetchSong(id)),
      setCurrentSong: (song) => dispatch(setCurrentSong(song)),
      playSong: (song) => dispatch(playSong(song)),
      pauseSong: (song) => dispatch(pauseSong(song)),
  });
};

class SongShowPage extends React.Component {
  constructor(props) {
    super(props);
    debugger
    this.renderPlayPauseSign = this.renderPlayPauseSign.bind(this);
    this.togglePlay = this.togglePlay.bind(this);
  }

  componentDidMount() {
    this.props.fetchSong(this.props.onPageSongId);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.onPageSongId !== nextProps.songId) {
      this.props.fetchTrack(nextProps.songId);
    }
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
              {this.renderPlayPauseSign(this.props.onPageSong)}
              {/* <WaveformPlayer song={this.props.song} /> */}
              <div className="song-show-page-song-info-container">
                <Link to={`/users/${this.props.artist.id}`} className="song-show-page-song-artist">{this.props.onPageSong.artist}</Link>
                <h2 className="song-show-page-song-title">{this.props.onPageSong.title}</h2>
              </div>
            </div>
            <div className="banner-player-right">
              <h4 className="song-show-page-song-upload-time"></h4>
              <h4 className="song-show-page-song-genre">#{this.props.onPageSong.title}</h4>
            </div>
          </div>
          <img src={this.props.onPageSong.imageURL ? this.props.onPageSong.imageURL : window.default_avatar} className="song-show-page-song-img"></img>        
        </div>

        <div className="song-show-page-content">
          <div className="song-show-page-social-els-container">
            <div className="song-show-page-comment-box-container">
              <img src={this.props.currentUser.imageURL ? this.props.currentUser.imageURL : window.default_avatar} className="song-show-page-comment-box-img"></img>
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
                <img src={this.props.onPageSong.artist.imageURL}></img>
                <p>{this.props.onPageSong.artist}</p>
                <div className="song-show-page-artist-follows-container">
                </div>
                <button className="song-show-page-follow-button">Follow</button>
              </div>
              <div className="song-show-page-description-comments">
                <div className="song-show-page-description-container">
                  {this.props.onPageSong.description}
                </div>
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

export default withRouter(connect(msp, mdp)(SongShowPage));
