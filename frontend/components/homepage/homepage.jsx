import React from "react";
import { connect } from "react-redux";
import { Switch, Route, withRouter } from "react-router-dom";
import { ProtectedRoute } from "../../util/route_util";
import HomepageNavbar from "./homepage_navbar";
import StreamPage from "./stream_page/stream_page";
import ChartsPage from "./charts_page/charts_page";

const msp = (state) => {
  return ({
    currentUser: state.entities.users[state.session.id],
  });
}

class Homepage extends React.Component {
  constructor(props) {
    super(props);
    this.renderNavbar = this.renderNavbar.bind(this);
  }

  renderNavbar() {
    if (this.props.currentUser) return <HomepageNavbar />;
  }

  render() {
    return (
      <div className="homepage-container">
        <div className="homepage-content-container">
          {this.renderNavbar()}
          <Switch>
            <ProtectedRoute path="/stream" component={StreamPage} />
            <ProtectedRoute path="/charts/top" component={ChartsPage} />
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
  }
};

export default withRouter(connect(msp, null)(Homepage));
