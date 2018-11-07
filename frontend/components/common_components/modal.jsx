import React from "react";
import { connect } from "react-redux";
import { closeModal } from "../../actions/modal_actions";
import LoginFormContainer from "./session_form/login_form_container";
import SignupFormContainer from "./session_form/signup_form_container";

const msp = (state) => {
  return ({
    modal: state.ui.modal,
  });
};

const mdp = (dispatch) => {
  return {
    closeModal: () => dispatch(closeModal()),
  };
};

class Modal extends React.Component {

  render() {
    if (!this.props.modal) {
      return null;
    }
    // const newModal = modal.modal;
    let component;
    switch (this.props.modal.modal) {
      case "login":
      component = <LoginFormContainer />;
      break;
      case "signup":
      component = <SignupFormContainer />;
      break;
      default:
      return null;
    }
    return (
      <div className="modal-background" onClick={this.props.closeModal}>
        <div className="modal-child" onClick={e => e.stopPropagation()}>
          { component }
        </div>
      </div>
    );
  }
}

export default connect(msp, mdp)(Modal);

