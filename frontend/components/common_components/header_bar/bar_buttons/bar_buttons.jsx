import React from "react";
import { Link } from "react-router-dom";

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
    return ;
      // <div className="protected-page-inner-bar">
      //   <Link to="/" ><img className="stream-logo" src={window.barLogo} ></img></Link>
      //   <Link to="/" className="bar-home">Home</Link>
      //   <Link to="/charts/top" className="bar-collection">Charts</Link>
      //   <div className="search-bar-container">
      //     <input type="text" placeholder="Search" className="search-bar"></input>
      //   </div>
      //   <Link to="/upload" className="upload-button">Upload</Link>
      //   <Link to="" className="profile-dropdown">
      //     <img className="profile-dropdown-img" src={window.default_avatar}></img>
      //     <p className="profile-dropdown-username">{this.props.currentUser.username}</p>
      //   </Link>
      //   <button className="logout-button" onClick={() => this.props.logout()}>Sign Out</button>
      // </div>
  }

  afterLogin() {
    return (
      <div className="protected-page-inner-bar">
        <Link to="/stream" ><img className="stream-logo" src={window.barLogo} ></img></Link>
        <Link to="/stream" className="bar-home">Home</Link>
        <Link to="/you/collection" className="bar-collection">Collection</Link>
        <div className="search-bar-container">
          <input type="text" placeholder="Search" className="search-bar"></input>
        </div>
        <Link to="/upload" className="upload-button">Upload</Link>
        <Link to="" className="profile-dropdown">
          <img className="profile-dropdown-img" src={window.default_avatar}></img>
          <p className="profile-dropdown-username">{this.props.currentUser.username}</p>
        </Link>
        <button className="logout-button" onClick={() => this.props.logout()}>Sign Out</button>
      </div>
    );

  }

  render() {
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
