import React from "react";
import { connect } from "react-redux";
import HeaderBar from "./header_bar";

const msp = (state) => {
  return {
    currentUser: state.entities.users[state.session.id],
  };
};

export default connect(msp, null)(HeaderBar);
