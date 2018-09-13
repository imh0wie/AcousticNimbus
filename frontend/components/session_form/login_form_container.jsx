import React from 'react';
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { login } from "../../actions/session_actions";
import SessionForm from "./session_form";

const msp = ({ errors }) => {
  return {
    errors: errors.session,
    formType: "login",
    switchLink: <Link to="/signup">Sign Up</Link>
  };
  // errors.session (Array)
};

const mdp = (dispatch) => {
  return {
    submitAction: (user) => dispatch(login(user))
  };
};

export default connect(msp, mdp)(SessionForm);
