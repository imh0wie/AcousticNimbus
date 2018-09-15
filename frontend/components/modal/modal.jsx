import React from "react";
import LoginFormContainer from "../session_form/login_form_container";
import SignupFormContainer from "../session_form/signup_form_container";

class Modal extends React.Component {
  render() {
    if (!this.props.modal) {
      debugger
      return null;
    }
    // const newModal = modal.modal;
    let component;
    switch (this.props.modal.modal) {
      case "login":
      debugger
      component = <LoginFormContainer />;
      break;
      case "signup":
      component = <SignupFormContainer />;
      break;
      default:
      // debugger
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




export default Modal;
