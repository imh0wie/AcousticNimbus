import React from "react";
import Slideshow from "../common_components/slideshow";

const Banner = (props) => {
  return (
    <div className="splash-page-header-bar">
      <Slideshow klass="banner" openModal={props.openModal} />
      <div className="header-buttons">
        <img src={window.logo}></img>
        <div className="user-auth-buttons">
          <button onClick={() => props.openModal("login")} className="login">Log In</button>
          <button onClick={() => props.openModal("signup")} className="signup">Create account</button>
        </div>
      </div>
    </div>
  );
}

export default Banner;
