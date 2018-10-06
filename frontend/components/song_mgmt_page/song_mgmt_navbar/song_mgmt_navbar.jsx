import React from "react";
import { Link, withRouter } from "react-router-dom";

const SongMgmtNavbar = () => {
  return (
    <div className="song-mgmt-navbar-container">
      <ul className="song-mgmt-navbar">
        <li className="song-mgmt-navbar-button-container">
          <Link to="/upload"><button className="song-mgmt-navbar-button">Upload</button></Link>
        </li>
        <li className="song-mgmt-navbar-button-container">
          <Link to="/you/songs"><button className="song-mgmt-navbar-button">Your Tracks</button></Link>
        </li>
      </ul>
    </div>
  );
};

export default withRouter(SongMgmtNavbar);
