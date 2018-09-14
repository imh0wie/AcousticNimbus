import React from 'react';
import { Link } from "react-router-dom";
import LoginFormContainer from "../session_form/login_form_container";
import SignupFormContainer from "../session_form/signup_form_container";

class HeaderButtons extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      form: null,
      formOn: false,
    };
    this.toggleForm = this.toggleForm.bind(this);
  }

  toggleForm(formType) {
    return (e) => {
      return this.setState({
        form: formType,
        formOn: !this.state.formOn
      })
    };
  }

  renderForm(form) {
    if (form === "login") {
      return (<LoginFormContainer />);
    } else if (form === "signup") {
      return (<SignupFormContainer />);
    } else {
      return (<div></div>);
    }
  }

  render () {
    if (this.props.currentUser) {
      return (
        <div className="header-buttons">
          <Link to="" className="upload-button">Upload</Link>
          <Link to="" className="profile-dropdown">
            <img className="profile-dropdown-img" src=""></img>
            <p className="profile-dropdown-username">{this.props.currentUser.username}</p>
          </Link>
        </div>
      );
      // {this.renderProfileDropdown}
    } else {
      return (
        <div className="user-auth-container">
          <div className="header-buttons">
            <button onClick={this.toggleForm("login")} className="login-button">Log In</button>
            <button onClick={this.toggleForm("signup")} className="signup-button">Create account</button>
          </div>
          <div className="user-form-container">
            {this.renderForm(this.state.form)}
          </div>
        </div>
      );
    }
  }
}


export default HeaderButtons;
//   if (this.state.form === "login" && this.state.formOn) {
//     return (
//       <LoginFormContainer />
//     );
//   } else if (this.state.form === "signup" && this.state.formOn) {
//     return (
//       <SignupFormContainer />
//     );
//   } else {
//     return (
//       <div></div>
//     )
//   }
// } else {
//
// }
