import React from "react";
import { Route, Link, Switch } from "react-router-dom";
import ModalContainer from "./modal/modal_container"
import HeaderBarContainer from "./header_bar/header_bar_container";
import LoginFormContainer from "./session_form/login_form_container";
import SignupFormContainer from "./session_form/signup_form_container";
import { AuthRoute } from "../util/route_util";

const App = () => {
  // debugger
  return (
    <div className="homepage-container">
      <ModalContainer />
      <HeaderBarContainer />
      <Switch>
        <Route exact path="/" component={HeaderBarContainer} />
        <AuthRoute path="/stream" component={HeaderBarContainer} />
      </Switch>
    </div>
  );
};

export default App;
// before switch:
// <AuthRoute exact path="/" component={}/>
// <header>
//   <Link to="/" className="header-link">
//     <h1>Acoustic Nimbus</h1>
//   </Link>
//   <img src="../../app/assets/images/slideshow-img1.jpg" alt="img1" width="100" height="100" />
//   <GreetingContainer />
// </header>
