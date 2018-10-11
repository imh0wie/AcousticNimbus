import React from "react";
import { Switch, Route } from "react-router-dom";
// import ModalContainer from "./modal/modal_container";
import HeaderBarContainer from "./common_components/header_bar/header_bar_container";
import SplashPage from "./splash_page/splash_page";
import Homepage from "./homepage/homepage";
import SongMgmtPage from "./song_mgmt_page/song_mgmt_page";
import { AuthRoute, ProtectedRoute } from "../util/route_util";
import SongShowPage from "./song_show_page/song_show_page";
import UserShowPage from "./user_show_page/user_show_page";
import PlayerBar from "./common_components/player_bar/player_bar";

const App = () => {
  return (
    <div className="app">
      <div className="page-container">
        <HeaderBarContainer />
        <Switch>
          <AuthRoute exact path="/" component={SplashPage} />
          <ProtectedRoute path="/stream" component={Homepage} />
          <ProtectedRoute path="/upload" component={SongMgmtPage} />
          <ProtectedRoute path="/you/collection" component={SongMgmtPage} />
          <Route path="/charts/top" component={Homepage} />
          <ProtectedRoute exact path="/songs/:songId" component={SongShowPage} />
          <Route exact path="/users/:userId" component={UserShowPage} />
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
