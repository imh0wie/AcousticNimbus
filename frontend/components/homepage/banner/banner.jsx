import React from "react";

class Banner extends React.Component {
  render() {
    return (
      <div className="homepage-header-bar">
        <div className="homepage-header-buttons">
          <div className="bar-logo">
            <img src={window.logo} className="logo-before-login"></img>
            <h2 className="logoname-before-login">ACOUSTICNIMBUS</h2>
          </div>
          <div className="user-auth-buttons">
            <button onClick={() => this.props.openModal("login")} className="login-button">Log In</button>
            <button onClick={() => this.props.openModal("signup")} className="signup-button">Create account</button>
          </div>
        </div>
      </div>
    );
  }
}

export default Banner;
