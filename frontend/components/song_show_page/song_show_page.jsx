import React from "react";
import { connect } from "react-redux";
import BannerPlayerContainer from "../banner_player/banner_player_container";
import SongShowPageContentContainer from "../song_show_page_content/song_show_page_content"
// import SongShowPageContentContainer from "../song_show_page_content/song_show_page_content_container";

const SongShowPage = () => {
  return (
    <div className="show-page-container">
      <div className="banner-player-container">
        <BannerPlayerContainer />
      </div>
      <h1>{this.props.song.title}</h1>
      <h1>{this.props.song.genre}</h1>
      <h1>{this.props.song.description}</h1>
      <h1>{this.props.song.availability}</h1>
    </div>
  );
};

const msp = (state) => {
  return {
    song: state.song,
  };
};

// <audio controls>
//   <source src="https://s3.amazonaws.com/acoustic-nimbus-fileupload-dev/AP6j3EYT7GuzuYYTtYobA5sw" type="audio/mpeg" />
// </audio>
export default connect(msp)(SongShowPage);
