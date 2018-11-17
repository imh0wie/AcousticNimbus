import React from "react";
import { Switch, withRouter } from "react-router-dom";
import { ProtectedRoute } from "../../util/route_util";
import Navbar from "../common_components/navbar";
import UploadForm from "./upload_form";
import SongsEditPage from "./songs_edit_page/songs_edit_page";

const SongsMgmtPage = () => {
  return (
    <div className="songs-mgmt-page">
      <Navbar klass="songs-mgmt-page"/>
      <div>
        <Switch>
          <ProtectedRoute exact path="/upload" component={UploadForm} />
          <ProtectedRoute exact path="/you/songs" component={SongsEditPage} />
        </Switch>
      </div>
    </div>
  );
};

export default withRouter(SongsMgmtPage);
// class SongManagementPage extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       currentTab: ["upload", "personalSongs"],
//     };
//   }
//
//   switchTab() {
//     const newCurrentTab = this.state.currentTab.reverse;
//     return e => this.setState({
//       currentTab: newCurrentTab,
//     });
//   }
//
//   renderTab() {
//     if (this.state.currentTab[0] === "upload") {
//       return (
//         <UploadFormContainer />
//       );
//     } else {
//       return (
//         <PersonalSongsListContainer />
//       );
//     }
//   }
//
//   render () {
//     return (
//       <div className="song-mgmt-page-container">
//         <div className="song-mgmt-navbar-container">
//           <div className="song-mgmt-navbar">
//             <div className="song-mgmt-navbar-button-container" onClick={this.switchTab()}>
//               <Link to="/upload" className="song-mgmt-navbar-button">Upload</Link>
//             </div>
//             <div className="song-mgmt-navbar-button-container" onClick={this.switchTab()}>
//               <Link to="/you/songs" className="song-mgmt-navbar-button">Your songs</Link>
//             </div>
//           </div>
//         </div>
//         <div className="song-mgmt-components-container">
//           {this.renderTab()}
//         </div>
//       </div>
//     );
//   }
// }
