import React from "react";
import { Switch, withRouter } from "react-router-dom";
import { ProtectedRoute } from "../../util/route_util";
import Navbar from "../common_components/navbar";
import StreamPage from "./stream_page/stream_page";
import ChartsPage from "./charts_page/charts_page";
import Slideshow from "../common_components/slideshow";
import WhoToFollow from "./who_to_follow/who_to_follow"
import LikesSection from "../common_components/likes_section";
import HiringInfoSection from "../common_components/hiring_info_section";

class Homepage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    }
  }
  
  componentDidMount() {
    this.setState({
      loading: false
    });
  }

  render() {
    if (this.state.loading) {
      return <img src={window.loading5} className="hp-loading"></img>
    }
    return (
      <div className="homepage">
        <div className="content">
          <Navbar klass="homepage" />
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
          <LikesSection klass="homepage" />
          <div className="history">
          </div>
          <HiringInfoSection />
        </div>
      </div>
    );
  }
};

export default withRouter(Homepage);
