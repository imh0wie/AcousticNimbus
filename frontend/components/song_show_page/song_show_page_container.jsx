import { connect } from "react-redux";
import SongShowPage from "./song_show_page";

const msp = (state) => {
  debugger
  return {
    song: state.entities.currentSong.song,
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
