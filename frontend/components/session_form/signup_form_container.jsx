import React from "react";
import { connect } from "react-redux";
import { signup } from "../../actions/session_actions";
import { openModal, closeModal } from "../../actions/modal_actions";
import SessionForm from "./session_form";

const msp = ({ errors }) => {
  // debugger
  return {
    errors: errors.session,
    formType: "signup",
  };
  // errors.session (Array)
};

const mdp = (dispatch) => {
  return {
    submitAction: (user) => dispatch(signup(user)),
    switchForm: (
      <button className="switch-login-button" onClick={() => dispatch(openModal("login"))}>
        Sign In
      </button>
    ),
    closeModal: () => dispatch(closeModal()),
  };
};

export default connect(msp, mdp)(SessionForm);
