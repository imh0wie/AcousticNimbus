import React from "react";
import { withRouter} from "react-router-dom";
// import { ProtectedRoute } from "../../util/route_util";
// import FeedPageNavbar from "./feed_page_navbar/feed_page_navbar";
import StreamPage from "./stream_page/stream_page";
import ChartsPage from "./charts_page/charts_page";

class FeedPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTab: ["stream", "charts"],
    };
  }

  switchTab() {
    const newCurrentTab = this.state.currentTab.reverse;
    return e => this.setState({
      currentTab: newCurrentTab,
    });
  }

  renderTab() {
    if (this.state.currentTab[0] === "stream") {
      return (
        <StreamPage />
      );
    } else {
      return (
        <ChartsPage />
      );
    }
  }

  render() {
    return (
      <div className="feed-page-container">
        <div className="feed-page">
          <div className="feed-page-navbar-container">
            <ul className="feed-page-navbar">
              <li className="feed-page-navbar-button-container">
                <h2 className="feed-page-navbar-button" onClick={() => this.props.history.push("/stream")}>Stream</h2>
              </li>
              <li className="feed-page-navbar-button-container">
                <h2 className="feed-page-navbar-button" onClick={() => this.props.history.push("/charts/top")}>Charts</h2>
              </li>
            </ul>
          </div>
          <div className="feed-page-content-container">
            {this.renderTab()}
          </div>
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
}

export default withRouter(FeedPage);

// <div className="feed-page-navbar-box">

// </div>
