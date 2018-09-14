import React from 'react';
import { Link } from "react-router-dom";
import { openModal } from "../../actions/modal_actions";
import LoginFormContainer from "../session_form/login_form_container";
import SignupFormContainer from "../session_form/signup_form_container";

const BarButtons = ( { currentUser, login, logout, openModal } ) {
  const renderForm = (form) => {
    if (form === "login") {
      return (<LoginFormContainer />);
    } else if (form === "signup") {
      return (<SignupFormContainer />);
    } else {
      return (<div></div>);
    }
  }

  const beforeLogin = () => {
    return (
      <div className="user-auth-container">
        <div className="bar-buttons">
          <button onClick={() => openModal("login")} className="login-button">Log In</button>
          <button onClick={() => openModal("signup")} className="signup-button">Create account</button>
        </div>
        <div className="user-form-container">
          {this.renderForm(this.state.form)}
        </div>
      </div>
    );
  }

  const afterLogin = () => {
    return (
      <div className="bar-buttons">
        <Link to="/stream" className=""<img src="logo.jpg" alt="logo" className="logo-after-login"></img>
        <Link to="" className="bar-collection">Collection</Link>
        <Link to="" className="upload-button">Upload</Link>
        <Link to="" className="profile-dropdown">
          <img className="profile-dropdown-img" src=""></img>
          <p className="profile-dropdown-username">{this.props.currentUser.username}</p>
        </Link>
      </div>
    );

  }

  if (currentUser) {
    return afterLogin();
  } else {
    return beforeLogin();
  }
}

export default BarButtons;

    // this.toggleForm = this.toggleForm.bind(this);


  // toggleForm(formType) {
  //   debugger
  //   return (e) => {
  //     return this.setState({
  //       form: formType,
  //       formOn: !this.state.formOn
  //     })
  //   };
  // }

//
//   render () {
//     if (this.props.currentUser) {
//       return (
//         <div className="bar-buttons">
//           <Link to="/stream" className=""<img src="logo.jpg" alt="logo" className="logo-after-login"></img>
//           <Link to="" className="bar-collection">Collection</Link>
//           <Link to="" className="upload-button">Upload</Link>
//           <Link to="" className="profile-dropdown">
//             <img className="profile-dropdown-img" src=""></img>
//             <p className="profile-dropdown-username">{this.props.currentUser.username}</p>
//           </Link>
//         </div>
//       );
//       // {this.renderProfileDropdown}
//     } else {
//       return (
//         <div className="user-auth-container">
//           <div className="bar-buttons">
//             <button onClick={() => openModal("login")} className="login-button">Log In</button>
//             <button onClick={() => openModal("signup")} className="signup-button">Create account</button>
//           </div>
//           <div className="user-form-container">
//             {this.renderForm(this.state.form)}
//           </div>
//         </div>
//       );
//     }
//   }
//


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
