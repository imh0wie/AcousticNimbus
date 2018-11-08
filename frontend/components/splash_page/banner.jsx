import React from "react";
import Slideshow from "../common_components/slideshow";

class Banner extends React.Component {
  render() {
    return (
      <div className="splash-page-header-bar">
        <Slideshow klass="banner" openModal={this.props.openModal} />
        <div className="header-buttons">
          <img src={window.logo}></img>
          <div className="user-auth-buttons">
            <button onClick={() => this.props.openModal("login")} className="login">Log In</button>
            <button onClick={() => this.props.openModal("signup")} className="signup">Create account</button>
          </div>
        </div>
      </div>
    );
  }
}

export default Banner;
