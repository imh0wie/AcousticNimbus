import React from "react";
import { NavLink, withRouter } from "react-router-dom";

const SongMgmtNavbar = () => {
  return (
    <div className="song-mgmt-navbar-container">
      <ul className="song-mgmt-navbar">
        <li className="song-mgmt-navbar-button-container">
          <NavLink to="/upload" className="song-mgmt-navbar-button" activeClassName="on">Upload</NavLink>
        </li>
        <li className="song-mgmt-navbar-button-container">
          <NavLink to="/you/songs" className="song-mgmt-navbar-button" activeClassName="on">Your Tracks</NavLink>
        </li>
      </ul>
    </div>
  );
};

export default withRouter(SongMgmtNavbar);
