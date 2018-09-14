import React from "react";
import { connect } from "react-redux";
import { login, logout } from "../../actions/session_actions";
import HeaderBar from "./header_bar";

const msp = ( { entities: { users }, session } ) => {
  // debugger
  return {
    currentUser: window.currentUser
  }
}

const mdp = (dispatch) => {
  return {
    login: (user) => dispatch(login(user)),
    logout: () => dispatch(logout())
  };
}

export default connect(msp, mdp)(HeaderBar);
