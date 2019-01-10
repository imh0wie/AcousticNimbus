import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { fetchSong, fetchSongs, emptyIndividualSong } from "../../actions/song_actions";
import { fetchFollows } from "../../actions/follow_actions";
import { fetchUsers } from "../../actions/user_actions";
import { isEmpty } from "../../util/general_api_util";
import Player from "../common_components/player";
import CommentBox from "../common_components/comment_box";
import SocialElements from "../common_components/social_elements";
import MiniArtistProfile from "../common_components/mini_artist_profile";
import CommentsList from "./comments_list/comments_list";
import Slideshow from "../common_components/slideshow";
import RelatedSongs from "./related_songs";
import LikesSection from "../common_components/likes_section";
import HiringInfoSection from "../common_components/hiring_info_section";

const msp = (state, ownProps) => {
  const onPageSongId = parseInt(ownProps.match.params.songId);
  return ({
    songs: state.entities.songs,
    // follows: state.entities.follows,
    // users: state.entities.users,
    onPageSongId: onPageSongId,
    // onPageSong: state.entities.songs && state.entities.songs.individualSong ? state.entities.songs.individualSong[onPageSongId] : null,
    // onPageSong: songs ? songs[parseInt(ownProps.match.params.songId)] : null,
    // currentSong: state.ui.currentSong,
  });
};

const mdp = (dispatch) => {
  return ({
      fetchSong: (id) => dispatch(fetchSong(id)),
      // fetchSongs: () => dispatch(fetchSongs()),
      // fetchFollows: () => dispatch(fetchFollows()),
      // fetchUsers: () => dispatch(fetchUsers()),
      emptyIndividualSong: (defaultState) => dispatch(emptyIndividualSong(defaultState)),
  });
};

class SongShowPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      onPageSong: this.props.songs && this.props.songs.individualSong ? this.props.songs.individualSong[onPageSongId] : null,
    }
    this.noneStyle = {display: "none"};
    this.songBanners = [window.song_banner1, window.song_banner2];
  }

  componentDidMount() {
    const defaultState = {
      followedSongs: this.props.songs ? this.props.songs.likedSongs : null,
      likedSongs: this.props.songs ? this.props.songs.likedSongs : null,
      songsOfSpecificUser: this.props.songs ? this.props.songs.songsOfSpecificUser : null,
      likedSongsOfSpecificUser: this.props.songs ? this.props.songs.likedSongsOfSpecificUser : null,
      individualSong: null,
      relatedSongsByGenre: this.props.songs ? this.props.songs.relatedSongsByGenre : null,
    };
    this.props.emptyIndividualSong(defaultState);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.songs && Object.keys(this.props.songs).includes("individualSong") && !this.props.songs.individualSong && nextProps.songs.individualSong && Object.keys(nextProps.songs.individualSong).length === 1) {
      this.setState({
        loading: false,
        onPageSong: nextProps.songs.individualSong[this.props.onPageSongId],
      });
    } else if (Object.keys(nextProps.songs).includes("individualSong") && !nextProps.songs.individualSong) {
      this.props.fetchSong(this.props.onPageSongId);
    }
  }

  // componentDidMount() {
  //   // if (isEmpty(this.props.songs)) 
  //   if (!this.props.songs) this.props.fetchSongs();
  //   // if (Object.keys(this.props.users) === 1 ) 
  //   if (Object.keys(this.props.users).length === 1 || !this.props.users) this.props.fetchUsers(); 
  //   // for mini artist profile and likes section
  //   // Note: likes section uses state to distinguish levels of loading for song show page
  //   // if (isEmpty(this.props.follows)) 
  //   if (!this.props.follows) this.props.fetchFollows();
  //   // for mini artist profile 
  //   this.setState({
  //       loading: false,
  //   });
  // }

  randomSongBanner() {
    return randomize(this.songBanners)[0];
  }

  render() {
    if (this.state.loading || !this.state.onPageSong) {
      return (
        <img src={window.loadingPizza} className="loading-page"></img>
      );
    } else {
      return (
        <div className="song-show-page">
          <Player klass="banner-player" song={this.state.onPageSong}/>
          <div className="content">
            <div className="social-els-container">
              <div className="extrovert-section">
                <CommentBox klass="song-show-page"/>
                <SocialElements klass="banner-player" song={this.state.onPageSong} songId={this.props.onPageSongId}/>
              </div>
              <div className="main">
                <MiniArtistProfile klass="song-show-page" songArtist={this.state.onPageSong.artist}/>
                <div className="description-comments">
                  <p className="description">{this.state.onPageSong.description}</p>
                  <CommentsList song={this.state.onPageSong} songId={this.props.onPageSongId} songArtist={this.state.onPageSong.artist}/>
                </div>
              </div>
            </div>
            <div className="sidebar">
              <Slideshow klass="ad"/>
              <RelatedSongs song={this.state.onPageSong} />
              <LikesSection klass="song-show-page" song={this.state.onPageSong} songId={this.props.onPageSongId}/>
              <HiringInfoSection />
            </div>
          </div>
        </div>
      );
    }
  }
}

export default withRouter(connect(msp, mdp)(SongShowPage));
