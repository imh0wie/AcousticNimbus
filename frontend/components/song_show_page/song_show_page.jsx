import React from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { fetchSongs, fetchSong } from "../../actions/song_actions";
import { setCurrentSong, playSong, pauseSong } from "../../actions/current_song_actions";
import { createLike, fetchLikes } from "../../actions/like_actions";
import { likesOf, liked } from "../../util/like_api_util";
import Waveform from "./waveform";

const msp = (state, ownProps) => {
  debugger
  return ({ 
    onPageSong: state.entities.songs[ownProps.match.params.songId],
    onPageSongId: parseInt(ownProps.match.params.songId),
    // onPageSongLikes: likesOf("Song", parseInt(ownProps.match.params.songId), state.entities.likes),
    onPageSongLiked: liked(state.entities.users[state.session.id], likesOf("Song", parseInt(ownProps.match.params.songId), state.entities.likes)),
    currentSong: state.ui.currentSong,
    currentUser: state.entities.users[state.session.id],
  });
};

const mdp = (dispatch) => {
  return ({
      fetchSongs: () => dispatch(fetchSongs()),
      fetchSong: (id) => dispatch(fetchSong(id)),
      setCurrentSong: (song) => dispatch(setCurrentSong(song)),
      playSong: () => dispatch(playSong()),
      pauseSong: () => dispatch(pauseSong()),
      createLike: (like) => dispatch(createLike(like)),
      fetchLikes: () => dispatch(fetchLikes()),
  });
};

class SongShowPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      likeableType: "Song",
      likeableId: parseInt(this.props.onPageSongId),
      likerId: parseInt(this.props.currentUser.id),
    }
    this.renderPlayPauseSign = this.renderPlayPauseSign.bind(this);
    // this.renderLike = this.renderLike.bind(this);
    this.renderLikeButton = this.renderLikeButton.bind(this);
    this.togglePlayPause = this.togglePlayPause.bind(this);
    this.handleLike = this.handleLike.bind(this);
  }

  componentDidMount() {
    // this.props.fetchSong(this.props.onPageSongId);
    debugger
    this.props.fetchSongs()
    this.props.fetchLikes();
  }

  // componentWillReceiveProps(nextProps) {
  //   debugger
  //   if (nextProps.songId !== this.props.onPageSongId) {
  //     this.props.fetchSong(nextProps.songId);
  //   }
  // }

  renderPlayPauseSign(song) {
    if (!this.props.currentSong.song || this.props.onPageSongId !== this.props.currentSong.song.id) {
      return (
        <img src={window.play_button} className="banner-player-play-sign" onClick={() => this.togglePlayPause(song)} />       
      );
    } else if (this.props.onPageSongId === this.props.currentSong.song.id && this.props.currentSong.playing) {
      return (
        <img src={window.pause_button} className="banner-player-pause-sign" onClick={() => this.togglePlayPause(song)} />
      );
    } else if (this.props.onPageSongId === this.props.currentSong.song.id && !this.props.currentSong.playing) {
      return (
        <img src={window.play_button} className="banner-player-play-sign" onClick={() => this.togglePlayPause(song)} />          
      );
    }
  }

  togglePlayPause(song) {
    if (!this.props.currentSong.song || this.props.onPageSongId !== this.props.currentSong.song.id) {
      this.props.setCurrentSong(song);
      this.props.playSong();
    } else if (this.props.onPageSongId === this.props.currentSong.song.id) {
      this.props.currentSong.playing ? this.props.pauseSong() : this.props.playSong() ;
    }
  }

  handleLike(e) {
    e.preventDefault();
    // let likeData = new FormData();
    const like = {
      // like: {
        likeable_type: this.state.likeableType,
        likeable_id: this.state.likeableId,
        liker_id: this.state.likerId,
      // },
    }
    // likeData.append('like[likeable_type]', this.state.likeableType);
    // likeData.append('like[likeable_id]', this.state.likeableId);
    // likeData.append('like[liker_id]', this.state.likerId);
    this.props.createLike(like);
  }

  // renderLike() {
  //   if (this.props.onPageSongLiked) {
  //     return <span><i className="fas fa-heart"></i> Liked</span>;
  //   } else {
  //     return <span><i className="fas fa-heart"></i> Like</span>;
  //   }
  // }

  renderLikeButton() {
    debugger
    if (this.props.onPageSongLiked) {
      debugger
      return (
        <button className="song-show-page-liked-button" onClick={(e) => this.handleLike(e)}><i className="fas fa-heart"></i> Liked</button>
      );
    } else {
      debugger
      return (
        <button className="song-show-page-like-button" onClick={(e) => this.handleLike(e)}><i className="fas fa-heart"></i> Like</button>
      );
    }
  }

  render() {
    if (!this.props.onPageSong) {
      return (
        <img src={window.loading} className="loading"></img>
      );
    } else {
      debugger
      return (
        <div className="song-show-page-container">
          <div className="banner-player-container">
            <div className="banner-player">
              <div className="banner-player-top">
                <div className="banner-player-top-left">
                  {this.renderPlayPauseSign(this.props.onPageSong)}
                  <div className="song-show-page-song-info-container">
                    <Link to={`/users/${this.props.onPageSong.artistId}`} className="song-show-page-song-artist">{this.props.onPageSong.artist}</Link>
                    <h2 className="song-show-page-song-title">{this.props.onPageSong.title}</h2>
                  </div>
                </div>
                <div className="banner-player-top-right">
                  <h4 className="song-show-page-song-upload-time"></h4>
                  <h4 className="song-show-page-song-genre">#{this.props.onPageSong.genre}</h4>
                </div>
              </div>
              <div className="banner-player-waveform-container">
                <Waveform 
                  onPageSong={this.props.onPageSong}
                  onPageSongId={this.props.onPageSongId}
                  currentSong={this.props.currentSong}
                />
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
                  <form>
                    {this.renderLikeButton()}
                  </form>
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
