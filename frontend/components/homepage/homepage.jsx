import React from "react";
import { Router, Switch, Route } from "react-router-dom";
import { ProtectedRoute } from "../../../util/route_util";
import HomepageNavbar from "./homepage_navbar";
import StreamPage from "./stream_page/stream_page";
import ChartsPage from "./charts_page/charts_page";

const Homepage = () => {
  return (
    <div className="homepage-container">
      <HomepageNavbar />
      <div className="homepage-content-container">
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
