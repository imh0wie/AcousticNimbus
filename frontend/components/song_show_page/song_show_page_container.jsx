import { connect } from "react-redux";
import SongShowPage from "./song_show_page";

const msp = (state, match) => {
  debugger
  return {
    song: state.entities.songs[match.params.songId],
  };
};

// const mdp = (state) => {
//   return {
//
//   }
// }

export default connect(msp, null)(SongShowPage);
