import React from "react";
import { connect } from "react-redux";
import SongShowPageContent from "./song_show_page_content";

const msp = (state) => {
  return {
    currentUser: state.entities.users[state.session.id],
  };
};

export default connect(msp)(SongShowPageContent);
