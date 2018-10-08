import React from "react";
// import { connect } from "react-redux";
import { Switch, Route } from "react-router-dom";
import { ProtectedRoute } from "../../util/route_util";
import HomepageNavbar from "./homepage_navbar";
import StreamPage from "./stream_page/stream_page";
import ChartsPage from "./charts_page/charts_page";

// const msp = (state) => {
//   currentUser: state.entities.users[state.session.id],
// }

const Homepage = () => {
  return (
    <div className="homepage-container">
      <div className="homepage-content-container">
      <HomepageNavbar />
        <Switch>
          <ProtectedRoute path="/stream" component={StreamPage} />
          <Route path="/charts/top" component={ChartsPage} />
        </Switch>
      </div>
      <div className="sidebar-container">
          <div className="sidebar-liked-songs">
          </div>
          <div className="sidebar-history">
          </div>
        </div>
    </div>
  );
};

export default Homepage;
