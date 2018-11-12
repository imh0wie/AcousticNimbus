import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { fetchSongs } from "../../actions/song_actions";
import { fetchFollows } from "../../actions/follow_actions";
import { fetchUsers } from "../../actions/user_actions";
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
  return ({ 
    onPageSong: state.entities.songs[parseInt(ownProps.match.params.songId)],
    currentSong: state.ui.currentSong,
  });
};

const mdp = (dispatch) => {
  return ({
      fetchSongs: () => dispatch(fetchSongs()),
      fetchFollows: () => dispatch(fetchFollows()),
      fetchUsers: () => dispatch(fetchUsers()),
  });
};

class SongShowPage extends React.Component {
  constructor(props) {
    super(props);
    this.noneStyle = {display: "none"};
    this.songBanners = [window.song_banner1, window.song_banner2];
    
  }

  componentDidMount() {
    this.props.fetchSongs();
    this.props.fetchUsers(); 
    // for mini artist profile and likes section
    // Note: likes section uses state to distinguish levels of loading for song show page
    this.props.fetchFollows();
    // for mini artist profile 
  }

  randomSongBanner() {
    return randomize(this.songBanners)[0];
  }

  render() {
    debugger
    if (!this.props.onPageSong) {
      debugger
      return (
        <img src={window.loading1} className="loading"></img>
      );
    } else {
      debugger
      return (
        <div className="song-show-page">
          <Player klass="banner-player" />
          <div className="content">
            <div className="social-els-container">
              <div className="extrovert-section">
                <CommentBox klass="song-show-page"/>
                <SocialElements klass="banner-player" />
              </div>
              <div className="main">
                <MiniArtistProfile klass="song-show-page" />
                <div className="description-comments">
                  <p className="description">{this.props.onPageSong.description}</p>
                  <CommentsList />
                </div>
              </div>
            </div>
            <div className="sidebar">
              <Slideshow klass="ad"/>
              <RelatedSongs />
              <LikesSection klass="song-show-page" />
              <HiringInfoSection />
            </div>
          </div>
        </div>
      );
    }
  }
}

export default withRouter(connect(msp, mdp)(SongShowPage));
