import React from "react";
import { Route } from "react-router-dom";
import GreetingContainer from "./greeting/greeting_container";
import LoginFormContainer from "./session_form/session_form";
import SignupFormContainer from "./session_form/session_form";

const App = () => {
  return (
    <div>
      <header>
        <h1>Acoustic Nimbus</h1>
        <GreetingContainer />
      </header>

      <Route exact path="/signup" component={SignupFormContainer} />
      <Route exact path="/login" component={LoginFormContainer} />
    </div>
  );
};

export default App;
