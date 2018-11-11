import React from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { fetchUsers } from "../../actions/user_actions";
import { fetchSongs, fetchSong } from "../../actions/song_actions";
import { setCurrentSong, playSong, pauseSong, setElapsedTo } from "../../actions/current_song_actions";
// import { latest } from "../../util/song_api_util";
import { createLike, removeLike, fetchLikes } from "../../actions/like_actions";
import { createFollow, removeFollow, fetchFollows } from "../../actions/follow_actions";
import { removeComment, fetchComments } from "../../actions/comment_actions";
import { likeOf, likesOf } from "../../util/like_api_util";
import { artistIdOf, followOf } from "../../util/follow_api_util";
import { commentsOf } from "../../util/comment_api_util";
import Player from "../common_components/player";
import CommentBox from "../common_components/comment_box";
import SocialElements from "../common_components/social_elements";
import MiniArtistProfile from "../common_components/mini_artist_profile";
import CommentsList from "./comments_list";
import CommentsListItem from "./comments_list_item";
import Slideshow from "../common_components/slideshow";

const msp = (state, ownProps) => {
  const songId = parseInt(ownProps.match.params.songId);
  const onPageSong = state.entities.songs[songId];
  const currentUserId = state.session.id;
  const likes = state.entities.likes;
  const follows = state.entities.follows;
  const comments = state.entities.comments;
  const users = state.entities.users;
  // debugger
  return ({ 
    onPageSong: onPageSong,
    onPageSongId: songId,
    // onPageSongLiked: liked(currentUser, likesOf("Song", parseInt(songId), likes)),
    // onPageArtist: state.entities.users[artistIdOf(onPageSong)],
    // onPageArtistFollowed: followed(artistIdOf(onPageSong), state.session.id, follows),
    currentSong: state.ui.currentSong,
    currentUserId: currentUserId,
    currentUser: users[currentUserId],
    currentLike: likeOf("Song", songId, users[currentUserId], likes),
    currentLikes: likesOf("Song", songId, likes),
    currentFollow: followOf(artistIdOf(onPageSong), currentUserId, follows),
    currentComments: commentsOf(songId, comments),
    users: users,
  });
};

const mdp = (dispatch) => {
  return ({
      fetchSongs: () => dispatch(fetchSongs()),
      fetchSong: (id) => dispatch(fetchSong(id)),
      // setCurrentSong: (song) => dispatch(setCurrentSong(song)),
      // playSong: () => dispatch(playSong()),
      // pauseSong: () => dispatch(pauseSong()),
      setElapsedTo: (time) => dispatch(setElapsedTo(time)),
      createLike: (like) => dispatch(createLike(like)),
      removeLike: (id) => dispatch(removeLike(id)),
      fetchLikes: () => dispatch(fetchLikes()),
      createFollow: (follow) => dispatch(createFollow(follow)),
      removeFollow: (id) => dispatch(removeFollow(id)),
      fetchFollows: () => dispatch(fetchFollows()),
      removeComment: (id) => dispatch(removeComment(id)),
      fetchComments: () => dispatch(fetchComments()),
      fetchUsers: () => dispatch(fetchUsers()),
  });
};

class SongShowPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      followedUserId: artistIdOf(this.props.onPageSong),
      followerId: this.props.currentUser.id,
      numOfComments: this.props.currentComments.length,
    }
    this.noneStyle = {display: "none"};
    this.songBanners = [window.song_banner1, window.song_banner2];
    
  }

  componentDidMount() {
    // this.props.fetchSong(this.props.onPageSongId);
    this.props.fetchSongs();
    // this.props.fetchLikes();
    // this.props.fetchFollows();
    // this.props.fetchComments();
    this.props.fetchUsers();
  }

  componentWillReceiveProps(nextProps) {
    if (artistIdOf(nextProps.onPageSong) !== this.state.followedUserId) {
      this.setState({
        followedUserId: artistIdOf(nextProps.onPageSong),
      });
    }
    if (this.props.currentComments.length !== nextProps.currentComments.length) {
      this.setState({
        body: "",
        songId: this.props.onPageSongId,
        commenterId: this.props.currentUser.id,
      })
    }
  }

  randomSongBanner() {
    return randomize(this.songBanners)[0];
  }

  render() {
    if (!this.props.onPageSong) {
      // debugger
      return (
        <img src={window.loading1} className="loading"></img>
      );
    } else {
      // debugger
      return (
        <div className="song-show-page">
          <Player
            klass="banner-player"
            song={this.props.onPageSong}
            songId={this.props.onPageSongId}
            // currentLikes={this.props.currentLikes}
            // currentComments={this.props.currentComments}
            // currentSong={this.props.currentSong}
            // setCurrentSong={this.props.setCurrentSong}
            // playSong={this.props.playSong}
            // pauseSong={this.props.pauseSong}
          />
          <div className="content">
            <div className="social-els-container">
              <div className="extrovert-section">
                <CommentBox 
                  klass="song-show-page"
                  songId={this.props.onPageSongId}
                  // currentSong={this.props.currentSong}
                  // currentUser={this.props.currentUser}
                  // currentUserId={this.props.currentUserId}
                />
                <SocialElements
                  klass="banner-player"
                  songId={this.props.onPageSongId}
                  // currentUser={this.props.currentUser}
                  // currentUserId={this.props.currentUserId}
                />
              </div>
              <div className="main">
                <MiniArtistProfile  
                  klass="song-show-page"
                  song={this.props.onPageSong}
                />
                <div className="description-comments">
                  <p className="description">{this.props.onPageSong.description}</p>
                  <CommentsList
                    song={this.props.onPageSong}
                    songId={this.props.onPageSongId}
                    // currentSong={this.props.currentSong}
                    // currentUser={this.props.currentUser}
                  />
                </div>
              </div>
            </div>
            <div className="song-show-page-sidebar">
              {/* <Slideshow /> */}
            </div>
          </div>
        </div>
      );
    }
  }
}
// style={{position: absolute; left: -9999px; width: 1px; height: 1px;}}
export default withRouter(connect(msp, mdp)(SongShowPage));
