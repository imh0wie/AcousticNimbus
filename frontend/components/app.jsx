import React from "react";
import { Switch, Route } from "react-router-dom";
// import ModalContainer from "./modal/modal_container";
import HeaderBarContainer from "./common_components/header_bar/header_bar_container";
import SplashPage from "./splash_page/splash_page";
import Homepage from "./page/homepage/homepage";
import SongMgmtPage from "./song_mgmt_page/song_mgmt_page";
import { AuthRoute, ProtectedRoute } from "../util/route_util";
import SongShowPageContainer from "./song_show_page/song_show_page_container";
import PlayerBar from "./common_components/player_bar/player_bar";

const App = () => {
  return (
    <div className="app">
      <HeaderBarContainer />
      <div className="page-container">
        <Switch>
          <ProtectedRoute path="/stream" component={Homepage} />
          <Route path="/charts" component={Homepage} />
          <ProtectedRoute path="/upload" component={SongMgmtPage} />
          <ProtectedRoute path="/you/collection" component={SongMgmtPage} />
          <AuthRoute exact path="/" component={SplashPage} />
          <Route exact path="/songs/:songId" component={SongShowPageContainer} />
        </Switch>
      </div>
      <PlayerBar />
    </div>
  );
};
// Move back when user page exists:
// <Route exact path="/users/:userId" component={SongMgmtPage} />

// <HeaderBarContainer />

// <ProtectedRoute exact path="/upload" component={SongMgmtPage} />
// <ProtectedRoute exact path="/songs/:songId" component={SongShowPageContainer} />
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
