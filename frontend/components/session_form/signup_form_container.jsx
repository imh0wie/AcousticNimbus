import React from 'react';
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { signup } from "../../actopms/session_actions";
import SessionForm from "./session_form";

const msp = ({ errors }) => {
  return {
    errors: errors.session,
    formType: "signup",
    switchLink: <Link to="/login">Log In</Link>
  };
  // errors.session (Array)
}

const mdp = (dispatch) => {
  return {
    submitAction: () => dispatch(signup())
  };
}

export default connect(msp, mdp)(SessionForm);
