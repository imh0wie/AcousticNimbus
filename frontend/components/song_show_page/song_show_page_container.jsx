import React from "react";
import { connect } from "react-redux";
import SongShowPage from "./song_show_page";

const msp = (state) => {
  return {
    currentSong: state.entities.currentSong.song,
    playing: state.entities.currentSong.playing,
    pos: state.entities.currentSong.pos,
  };
};

// const mdp = (state) => {
//   return {
//
//   }
// }

export default connect(msp)(SongShowPage);
