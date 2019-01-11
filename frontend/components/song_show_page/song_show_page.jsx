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
  const songs = state.entities.songs;
  const onPageSongId = parseInt(ownProps.match.params.songId);
  return ({
    songs: songs,
    onPageSongId: onPageSongId,
    onPageSong: (songs && songs.individualSong) ? songs.individualSong[onPageSongId] : null,
  });
};

const mdp = (dispatch) => {
  return ({
      fetchSong: (id) => dispatch(fetchSong(id)),
      emptyIndividualSong: (defaultState) => dispatch(emptyIndividualSong(defaultState)),
  });
};

class SongShowPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    }
    this.noneStyle = {display: "none"};
    this.songBanners = [window.song_banner1, window.song_banner2];
  }

  componentDidMount() {
    this.props.fetchSong(this.props.onPageSongId);
    this.setState({
      loading: false,
    });
  }

  componentWillUnmount() {
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

  randomSongBanner() {
    return randomize(this.songBanners)[0];
  }

  render() {
    if (this.state.loading || !this.props.onPageSong) {
      return (
        <img src={window.loadingPizza} className="loading-page"></img>
      );
    } else {
      return (
        <div className="song-show-page">
          <Player klass="banner-player" song={this.props.onPageSong}/>
          <div className="content">
            <div className="social-els-container">
              <div className="extrovert-section">
                <CommentBox klass="song-show-page"/>
                <SocialElements klass="banner-player" song={this.props.onPageSong} songId={this.props.onPageSongId}/>
              </div>
              <div className="main">
                <MiniArtistProfile klass="song-show-page" songArtist={this.props.onPageSong.artist}/>
                <div className="description-comments">
                  <p className="description">{this.props.onPageSong.description}</p>
                  <CommentsList song={this.props.onPageSong} songId={this.props.onPageSongId} songArtist={this.props.onPageSong.artist}/>
                </div>
              </div>
            </div>
            <div className="sidebar">
              <Slideshow klass="ad"/>
              <RelatedSongs song={this.props.onPageSong} songId={this.props.onPageSongId}/>
              <LikesSection klass="song-show-page" song={this.props.onPageSong} songId={this.props.onPageSongId}/>
              <HiringInfoSection />
            </div>
          </div>
        </div>
      );
    }
  }
}

export default withRouter(connect(msp, mdp)(SongShowPage));
