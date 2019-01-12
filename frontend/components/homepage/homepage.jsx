import React from "react";
import { connect } from "react-redux";
import { Switch, withRouter } from "react-router-dom";
import { ProtectedRoute } from "../../util/route_util";
import { emptyLikes } from "../../actions/like_actions";
import { emptyFollows } from "../../actions/follow_actions";
import { emptyCommentsOfSpecificSong } from "../../actions/comment_actions";
import Navbar from "../common_components/navbar";
import StreamPage from "./stream_page/stream_page";
import ChartsPage from "./charts_page/charts_page";
import Slideshow from "../common_components/slideshow";
import WhoToFollow from "./who_to_follow/who_to_follow"
import LikesSection from "../common_components/likes_section";
import HiringInfoSection from "../common_components/hiring_info_section";

const msp = (state) => {
  return {
    likes: state.entities.likes,
    follows: state.entities.follows,
    comments: state.entities.comments,
  }
}

const mdp = (dispatch) => {
  return {
    emptyLikes: (state) => dispatch(emptyLikes(state)),
    emptyFollows: (state) => dispatch(emptyFollows(state)),
    emptyCommentsOfSpecificSong: (state) => dispatch(emptyCommentsOfSpecificSong(state)),
  }
}

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

  componentWillUnmount() {
    if (this.props.likes) this.props.emptyLikes(null);
    if (this.props.follows) this.props.emptyFollows(null);
    if (this.props.comments) this.props.emptyCommentsOfSpecificSong(null);
  }

  render() {
    if (this.state.loading) {
      return <img src={window.loadingPizza} className="hp-loading"></img>
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

export default withRouter(connect(msp, mdp)(Homepage));
