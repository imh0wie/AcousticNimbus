import React from "react";
import { connect } from "react-redux";
import { login, logout } from "../../actions/session_actions";
import HeaderBar from "./header_bar";

const msp = (state) => {
  // debugger
  return {
    currentUser: state.entities.users[state.session.id],
  };
};

const mdp = (dispatch) => {
  return {
    login: (user) => dispatch(login(user)),
    logout: () => dispatch(logout()),
  };
};

export default connect(msp, mdp)(HeaderBar);
