import React from "react";
import { Switch } from "react-router-dom";
// import ModalContainer from "./modal/modal_container";
import HeaderBarContainer from "./common_components/header_bar/header_bar_container";
import Homepage from "./homepage/homepage";
import StreamPage from "./stream_page/stream_page";
import SongManagementPage from "./song_management_page/song_management_page";
import { AuthRoute, ProtectedRoute } from "../util/route_util";
import SongShow from "./song_show_page/song_show_page";

const App = () => {
  return (
    <div className="app">
      <div className="page-header-container">
      </div>
      <div>
        <HeaderBarContainer />
        <Switch>
          <ProtectedRoute exact path="/stream" component={StreamPage} />
          <ProtectedRoute exact path="/upload" component={SongManagementPage} />
          <ProtectedRoute exact path="/songs/:songId" component={SongShow} />
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
