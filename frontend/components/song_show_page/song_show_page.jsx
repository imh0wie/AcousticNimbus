import React from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { fetchSongs, fetchSong } from "../../actions/song_actions";
import { setCurrentSong, playSong, pauseSong } from "../../actions/current_song_actions";
// import { latest } from "../../util/song_api_util";


const msp = (state, ownProps) => {
  debugger
  return ({
    onPageSongId: ownProps.match.params.songId,
    onPageSong: state.entities.songs[ownProps.match.params.songId],
    currentSong: state.ui.currentSong,
    currentUser: state.entities.users[state.session.id],
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
    debugger
    this.props.fetchSong(this.props.onPageSongId);
  }

  // componentWillReceiveProps(nextProps) {
  //   debugger
  //   if (nextProps.songId !== this.props.onPageSongId) {
  //     this.props.fetchSong(nextProps.songId);
  //   }
  // }

  renderPlayPauseSign(song) {
    if (!this.props.currentSong.song || song.id !== this.props.currentSong.song.id || !this.props.currentSong.playing) {
        return (
            // <div className="banner-player-play-container">
                <img src={window.play_button} className="banner-player-play-sign" onClick={() => this.togglePlay(song)} />
            // </div>
        );
    } else if (song.id === this.props.currentSong.song.id && this.props.currentSong.playing) {
        return (
            // <div className="banner-player-pause-container">
                <img src={window.pause_button} className="banner-player-pause-sign" onClick={() => this.togglePlay(song)} />
            // </div>
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

  // handleLike() {

  // }

  renderLikeButton() {

  }

  render() {
    if (!this.props.onPageSong) {
      debugger
      return (
        <img src={window.loading} className="loading"></img>
      );
    } else {
      debugger
      return (
        <div className="song-show-page-container">
          <div className="banner-player-container">
            <div className="banner-player">
              <div className="banner-player-left">
                <div className="banner-player-left-top">
                  {this.renderPlayPauseSign(this.props.onPageSong)}
                  <div className="song-show-page-song-info-container">
                    <Link to={`/users/${this.props.onPageSong.artistId}`} className="song-show-page-song-artist">{this.props.onPageSong.artist}</Link>
                    <h2 className="song-show-page-song-title">{this.props.onPageSong.title}</h2>
                  </div>
                  <div className="banner-player-waveform-container">
                    {/* <WaveformPlayer song={this.props.song} /> */}
                  </div>
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
                <div className="song-show-page-comment-box-wrapper">
                  <img src={this.props.currentUser.imageURL ? this.props.currentUser.imageURL : window.default_avatar} className="song-show-page-comment-box-img"></img>
                  <form>
                    <input type="text" name="comment" placeholder="Write a comment" className="song-show-page-comment-box" />
                    <input type="submit" className="song-show-page-comment-submit-button" tabIndex="-1" />
                  </form>
                </div>
                <div className="song-show-page-social-els">
                  <div className="song-show-page-social-els-left">
                    <button className="song-show-page-like-button" onClick={() => this.handleLike()}><i class="fas fa-heart"></i> Like</button>
                  </div>
                  <div className="song-show-page-social-els-right">
                  </div>
                </div>
              </div>
              <div className="song-show-page-main-container">
                <div className="song-show-page-artist-info-container">
                  <img src={this.props.onPageSong.artist.imageURL ? this.props.onPageSong.artist.imageURL : window.default_avatar} className="song-show-page-artist-img"></img>
                  <Link to={`/users/${this.props.onPageSong.artistId}`} className="song-show-page-artist">{this.props.onPageSong.artist}</Link>
                  <div className="song-show-page-artist-follows-container">
                  </div>
                  <button className="song-show-page-follow-button">Follow</button>
                </div>
                <div className="song-show-page-description-comments">
                  <div className="song-show-page-description-container">
                    <p className="song-show-page-description">{this.props.onPageSong.description}</p>
                  </div>
                  <div className="song-show-page-comments-container">
                    <div className="song-show-page-comments-header-container">
                      <p className="song-show-page-comments-header">N comments</p>
                    </div>
  
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
}
// style={{position: absolute; left: -9999px; width: 1px; height: 1px;}}

export default withRouter(connect(msp, mdp)(SongShowPage));
