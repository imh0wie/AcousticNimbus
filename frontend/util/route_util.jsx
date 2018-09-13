import React from "react";
import { connect } from "react-redux";
import { Route, Redirect, withRouter } from "react-router-dom"
// Explicitly return to check argument
const Auth = ( { component: Component, path, loggedIn, exact } ) => (
    <Route path={path} exact={exact} render={(props) => (
      loggedIn ? (
        <Redirect to="/" />
      ) : (
        <Component {...props} />
      )
    )} />
  );


const msp = (state) => {
  return { loggedIn: Boolean(state.session.id) };
};

export const AuthRoute = withRouter(connect(msp, null)(Auth));
