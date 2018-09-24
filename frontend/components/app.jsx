import React from "react";
import { Switch } from "react-router-dom";
// import ModalContainer from "./modal/modal_container";
import HeaderBarContainer from "./common_components/header_bar/header_bar_container";
import Homepage from "./homepage/homepage";
import FeedPage from "./feed_page/feed_page";
import SongMgmtPage from "./song_mgmt_page/song_mgmt_page";
import { AuthRoute, ProtectedRoute } from "../util/route_util";
import SongShowPageContainer from "./song_show_page/song_show_page_container";

const App = () => {
  return (
    <div className="app">

      <HeaderBarContainer />
      <div>
        <Switch>
          <ProtectedRoute exact path="/stream" component={FeedPage} />
          <ProtectedRoute exact path="/upload" component={SongMgmtPage} />
          <ProtectedRoute exact path="/songs/:songId" component={SongShowPageContainer} />
          <AuthRoute exact path="/" component={Homepage} />
        </Switch>
      </div>
    </div>
  );
};
// <HeaderBarContainer />

export default App;
// before switch:
// <AuthRoute exact path="/" component={}/>
// <header>
//   <Link to="/" className="header-link">
//     <h1>Acoustic Nimbus</h1>
//   </Link>
//   <img src="../../app/assets/images/slideshow-img1.jpg" alt="img1" width="100" height="100" />
//   <GreetingContainer />
// </header>
