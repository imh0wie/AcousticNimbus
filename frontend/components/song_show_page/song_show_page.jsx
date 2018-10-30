import React from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { fetchUsers } from "../../actions/user_actions";
import { fetchSongs, fetchSong } from "../../actions/song_actions";
import { setCurrentSong, playSong, pauseSong } from "../../actions/current_song_actions";
import { createLike, removeLike, fetchLikes } from "../../actions/like_actions";
import { createFollow, removeFollow, fetchFollows } from "../../actions/follow_actions";
import { createComment, removeComment, fetchComments } from "../../actions/comment_actions";
import { likeOf } from "../../util/like_api_util";
import { artistIdOf, followOf } from "../../util/follow_api_util";
import { commentsOf } from "../../util/comment_api_util";
import Waveform from "./waveform";

const msp = (state, ownProps) => {
  const songId = parseInt(ownProps.match.params.songId);
  const onPageSong = state.entities.songs[songId];
  const currentUser = state.entities.users[state.session.id];
  const likes = state.entities.likes;
  const follows = state.entities.follows;
  const comments = state.entities.comments;
  debugger
  return ({ 
    onPageSong: onPageSong,
    onPageSongId: songId,
    // onPageSongLiked: liked(currentUser, likesOf("Song", parseInt(songId), likes)),
    // onPageArtist: state.entities.users[artistIdOf(onPageSong)],
    // onPageArtistFollowed: followed(artistIdOf(onPageSong), state.session.id, follows),
    currentSong: state.ui.currentSong,
    currentUser: currentUser,
    currentLike: likeOf("Song", songId, currentUser, likes),
    currentFollow: followOf(artistIdOf(onPageSong), currentUser.id, follows),
    currentComments: commentsOf(songId, comments),
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
      removeLike: (id) => dispatch(removeLike(id)),
      fetchLikes: () => dispatch(fetchLikes()),
      createFollow: (follow) => dispatch(createFollow(follow)),
      removeFollow: (id) => dispatch(removeFollow(id)),
      fetchFollows: () => dispatch(fetchFollows()),
      createComment: (comment) => dispatch(createComment(comment)),
      removeComment: (id) => dispatch(removeComment(id)),
      fetchComments: () => dispatch(fetchComments()),
      fetchUsers: () => dispatch(fetchUsers()),
  });
};

class SongShowPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      likeableType: "Song",
      likeableId: this.props.onPageSongId,
      likerId: this.props.currentUser.id,
      followedUserId: artistIdOf(this.props.onPageSong),
      followerId: this.props.currentUser.id,
    }
    debugger
    this.renderPlayPauseSign = this.renderPlayPauseSign.bind(this);
    // this.renderLike = this.renderLike.bind(this);
    this.renderLikeButton = this.renderLikeButton.bind(this);
    this.renderFollowButton = this.renderFollowButton.bind(this);
    this.renderCommentsSection = this.renderCommentsSection.bind(this);
    this.togglePlayPause = this.togglePlayPause.bind(this);
    this.handleLike = this.handleLike.bind(this);
    this.handleFollow = this.handleFollow.bind(this);
  }

  componentDidMount() {
    // this.props.fetchSong(this.props.onPageSongId);
    debugger
    this.props.fetchSongs();
    this.props.fetchLikes();
    this.props.fetchFollows();
    this.props.fetchComments();
    this.props.fetchUsers();
  }

  componentWillReceiveProps(nextProps) {
    if (artistIdOf(nextProps.onPageSong) !== this.state.followedUserId) {
      this.setState({
        followedUserId: artistIdOf(nextProps.onPageSong),
      });
    }
  }

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
    debugger
    if (this.props.currentLike) {
      this.props.removeLike(this.props.currentLike.id);
    } else {
      const like = {
        likeable_type: this.state.likeableType,
        likeable_id: this.state.likeableId,
        liker_id: this.state.likerId,
      }
      debugger
      this.props.createLike(like);
    }
  }

  handleFollow(e) {
    e.preventDefault();
    debugger
    if (this.props.currentFollow) {
      debugger
      this.props.removeFollow(this.props.currentFollow.id);
    } else {
      debugger
      const follow = {
        followed_user_id: this.state.followedUserId,
        follower_id: this.state.followerId,
      }
      debugger
      this.props.createFollow(follow);
    }
  }

  renderLikeButton() {
    debugger
    if (this.props.currentLike) {
      return (
        <button className="song-show-page-liked-button" onClick={(e) => this.handleLike(e)}><i className="fas fa-heart"></i> Liked</button>
      );
    } else {
      return (
        <button className="song-show-page-like-button" onClick={(e) => this.handleLike(e)}><i className="fas fa-heart"></i> Like</button>
      );
    }
  }

  renderFollowButton() {
    debugger
    if (this.props.onPageSong.artistId === this.props.currentUser.id) return;
    if (this.props.currentFollow) {
      debugger
      return (
        <button className="song-show-page-follow-button" onClick={(e) => this.handleFollow(e)}>Following</button>
      );
    } else {
      debugger
      return (
        <button className="song-show-page-follow-button" onClick={(e) => this.handleFollow(e)}>Follow</button>
      );
    }
  }

  renderCommentsSection() {
    if (this.props.currentComments.length === 0) {
      return (
        <div className="song-show-page-comments-container">
          <img src={window.message}></img>
          <h3>Seems a little quiet over here</h3>
          <h4>Be the first to comment on this song</h4>
        </div>
      );
    } else {
      const commentsHeader = this.props.currentComments.length > 1 ? `${this.props.currentComments.length} comments` : "1 comment";
      return (
        <div className="song-show-page-comments-container">
          <div className="song-show-page-comments-header-container">
            <p className="song-show-page-comments-header">{commentsHeader}</p>
          </div>
        </div>
      );
    }
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
                  <form>
                    {this.renderFollowButton()}
                  </form>
                </div>
                <div className="song-show-page-description-comments">
                  <div className="song-show-page-description-container">
                    <p className="song-show-page-description">{this.props.onPageSong.description}</p>
                  </div>
                  {this.renderCommentsSection()}
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
