import React from "react";
import { Link } from "react-router-dom";
import { openModal } from "../../actions/modal_actions";
import LoginFormContainer from "../session_form/login_form_container";
import SignupFormContainer from "../session_form/signup_form_container";

class BarButtons extends React.Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   form: null,
    // };
    this.beforeLogin = this.beforeLogin.bind(this);
    this.afterLogin = this.afterLogin.bind(this);
  }

  beforeLogin() {
    return (
      <div className="homepage-header-bar">
        <div className="bar-logo">
          <img src={window.logo} className="logo-before-login"></img>
          <h2 className="logoname-before-login">ACOUSTIC NIMBUS</h2>
        </div>
        <div className="user-auth-buttons">
          <button onClick={() => this.props.openModal("login")} className="login-button">Log In</button>
          <button onClick={() => this.props.openModal("signup")} className="signup-button">Create account</button>
        </div>
      </div>
    );
  }

  afterLogin() {
    return (
      <div className="landing-page-header-bar">
        <Link to="/stream" ><img className="bar-logo" src={window.logo} ></img></Link>
        <Link to="/you/collection" className="bar-collection">Collection</Link>
        <input type="text" placeholder="Search" className="search-bar"></input>
        <Link to="" className="upload-button">Upload</Link>
        <Link to="" className="profile-dropdown">
          <img className="profile-dropdown-img" src={window.default_avatar}></img>
          <p className="profile-dropdown-username">{this.props.currentUser.username}</p>
        </Link>
      </div>
    );

  }

  render() {
    // debugger
    if (this.props.currentUser) {
      return this.afterLogin();
    } else {
      return this.beforeLogin();
    }
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
