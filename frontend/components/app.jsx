import React from "react";
import { Route, Link, Switch } from "react-router-dom";
import GreetingContainer from "./greeting/greeting_container";
import LoginFormContainer from "./session_form/login_form_container";
import SignupFormContainer from "./session_form/signup_form_container";
import { AuthRoute } from "../util/route_util";

const App = () => {
  return (
    <div>
      <header>
        <Link to="/">
          <h1>Acoustic Nimbus</h1>
        </Link>
        <GreetingContainer />
      </header>

      <Switch>
        <Route exact path="/" />
        <AuthRoute path="/signup" component={SignupFormContainer} />
        <AuthRoute path="/login" component={LoginFormContainer} />
      </Switch>
    </div>
  );
};

export default App;
