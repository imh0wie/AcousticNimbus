import React from "react";
import { Switch } from "react-router-dom";
import { ProtectedRoute } from "../../util/route_util";
import HeaderBarContainer from "../common_components/header_bar/header_bar_container";
import Homepage from "./homepage/homepage";
import SongMgmtPage from "../song_mgmt_page/song_mgmt_page";
// import FeedPageNavbar from "./feed_page_navbar/feed_page_navbar";
// import StreamPage from "./stream_page/stream_page";
// import ChartsPage from "./charts_page/charts_page";

const Page = () => {
  return (
    <div>
      <div className="page-container">
        <div className="page">
            <ProtectedRoute path="/stream" component={Homepage} />
            <ProtectedRoute path="/you/collection" component={Homepage} />
        </div>
      </div>
    </div>
  );
};


export default Page;






// <div className="feed-page-navbar-box">

// </div>
