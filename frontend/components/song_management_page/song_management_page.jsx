import React from "react";
import { NavLink, withRouter } from "react-router-dom";
import UploadFormContainer from "../upload_form/upload_form_container";
import PersonalSongsListContainer from "../personal_songs_list/personal_songs_list_container";

class SongManagementPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTab: ["upload", "personalSongs"],
    };
  }

  switchTab() {
    const newCurrentTab = this.state.currentTab.reverse;
    return e => this.setState({
      currentTab: newCurrentTab,
    });
  }

  renderTab() {
    if (this.state.currentTab[0] === "upload") {
      return (
        <UploadFormContainer />
      );
    } else {
      return (
        <PersonalSongsListContainer />
      );
    }
  }

  render () {
    return (
      <div className="song-mgmt-page-container">
        <div className="song-mgmt-navbar-container">
          <div className="song-mgmt-navbar">
            <NavLink to="/upload" activeClassName="song-mgmt-navbar-button" onClick={this.switchTab()}>Upload</NavLink>
            <NavLink to="/you/songs" activeClassName="song-mgmt-navbar-button" onClick={this.switchTab()}>Your songs</NavLink>
          </div>
        </div>
        <div className="song-mgmt-components-container">
          {this.renderTab()}
        </div>
      </div>
    );
  }
}

export default withRouter(SongManagementPage);
