import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { fetchUsers } from "../../actions/user_actions";
import { fetchSongs } from "../../actions/song_actions";
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
  const songId = parseInt(ownProps.match.params.songId);
  const onPageSong = state.entities.songs[songId];
  const users = state.entities.users;
  return ({ 
    onPageSong: onPageSong,
    onPageSongId: songId,
    currentSong: state.ui.currentSong,
    users: users,
  });
};

const mdp = (dispatch) => {
  return ({
      fetchSongs: () => dispatch(fetchSongs()),
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
  }

  randomSongBanner() {
    return randomize(this.songBanners)[0];
  }

  render() {
    if (!this.props.onPageSong) {
      return (
        <img src={window.loading1} className="loading"></img>
      );
    } else {
      return (
        <div className="song-show-page">
          <Player
            klass="banner-player"
            song={this.props.onPageSong}
            songId={this.props.onPageSongId}
          />
          <div className="content">
            <div className="social-els-container">
              <div className="extrovert-section">
                <CommentBox 
                  klass="song-show-page"
                  songId={this.props.onPageSongId}
                />
                <SocialElements
                  klass="banner-player"
                  songId={this.props.onPageSongId}
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
                  />
                </div>
              </div>
            </div>
            <div className="sidebar">
              <Slideshow klass="ad"/>
              <RelatedSongs 
                song={this.props.onPageSong}
                songId={this.props.onPageSongId}
              />
              <LikesSection
                klass="song-show-page"
                song={this.props.onPageSong}
                songId={this.props.onPageSongId}
              />
              <HiringInfoSection />
            </div>
          </div>
        </div>
      );
    }
  }
}

export default withRouter(connect(msp, mdp)(SongShowPage));
