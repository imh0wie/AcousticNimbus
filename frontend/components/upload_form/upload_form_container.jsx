import React from "react";
import { connect } from "react-redux";
import { createSong } from "../../actions/song_actions";
// import { createCurrentSong } from "../..actions/current_song_actions";
import UploadForm from "./upload_form";

const msp = (state) => {
  return {
    errors: state.errors.songs,
    currentUser: state.entities.users[state.session.id],
  };
  // errors.session (Array)
};

const mdp = (dispatch) => {
  return {
    submitAction: (song) => dispatch(createSong(song)),
  };
};

// addCurrentSong: (song) => dispatch(createCurrentSong(song)),
export default connect(msp, mdp)(UploadForm);
