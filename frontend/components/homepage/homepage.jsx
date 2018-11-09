import React from "react";
import { connect } from "react-redux";
import { Switch, Route, withRouter } from "react-router-dom";
import { ProtectedRoute } from "../../util/route_util";
import Navbar from "../common_components/navbar";
import StreamPage from "./stream_page/stream_page";
import ChartsPage from "./charts_page/charts_page";
import Slideshow from "../common_components/slideshow";
import WhoToFollow from "./who_to_follow/who_to_follow"
import LikesSection from "./likes_section/likes_section";

const msp = (state) => {
  const currentUserId = state.session.id;
  return ({
    currentUserId: currentUserId,
    currentUser: state.entities.users[currentUserId],
  });
}

class Homepage extends React.Component {
  constructor(props) {
    super(props);
    this.noneStyle = {
      display: "none"
    };
  }

  render() {
    return (
      <div className="homepage-container">
        <div className="content">
          <Navbar klass="homepage" currentUser={this.props.currentUser} />
          <Switch>
            <ProtectedRoute path="/stream" component={StreamPage} />
            <ProtectedRoute path="/charts/top" component={ChartsPage} />
          </Switch>
        </div>
        <div className="sidebar">
          <Slideshow klass="ad"/>
          <div className="stats">
          </div>
          <WhoToFollow />
          <LikesSection />
          <div className="liked-songs">
          </div>
          <div className="history">
          </div>
        </div>
      </div>
    );
  }
};

export default withRouter(connect(msp, null)(Homepage));
