import React from "react";
import { Link, withRouter } from "react-router-dom";

const SongMgmtNavbar = () => {
  return (
    <div className="song-mgmt-navbar-container">
      <ul className="song-mgmt-navbar">
        <li className="song-mgmt-navbar-button-container">
          <Link to="/upload"><h2 className="song-mgmt-navbar-button">Upload</h2></Link>
        </li>
        <li className="song-mgmt-navbar-button-container">
          <Link to="/you/songs"><h2 className="song-mgmt-navbar-button">Your Tracks</h2></Link>
        </li>
      </ul>
    </div>
  );
};

export default withRouter(SongMgmtNavbar);
