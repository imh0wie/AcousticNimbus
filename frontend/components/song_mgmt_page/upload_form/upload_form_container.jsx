import { connect } from "react-redux";
import { createSong } from "../../../actions/song_actions";
import { setCurrentSong } from "../../../actions/current_song_actions";
import UploadForm from "./upload_form";

const msp = (state) => {
  debugger
  return {
    currentUser: state.entities.users[state.session.id],
    // songs: state.entities.songs,
    errors: state.errors.songs,
  };
  // errors.session (Array)
};

const mdp = (dispatch) => {
  return {
    submitAction: (song) => dispatch(createSong(song)),
    setCurrentSong: (song) => dispatch(setCurrentSong(song)),
  };
};

// addCurrentSong: (song) => dispatch(createCurrentSong(song)),
export default connect(msp, mdp)(UploadForm);
