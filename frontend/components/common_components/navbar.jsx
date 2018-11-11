import React from "react";
import { connect } from "react-redux";
import { NavLink, withRouter } from "react-router-dom";

const msp = (state) => {
  const currentUserId = state.session.id;
  return ({
    currentUserId: currentUserId,
    currentUser: state.entities.users[currentUserId],
  });
}

const Navbar = (props) => {
  if (!props.currentUser) return null;
  switch (props.klass) {
    case "homepage":
      return (
        <div className="navbar">
          <NavLink to="/stream" activeClassName="active">Stream</NavLink> 
          <NavLink to="/charts/top" activeClassName="active">Charts</NavLink>
        </div>
      );
    case "user-show-page":
      return (
        <div className="navbar">
          <NavLink to={`/users/${props.onPageArtistId}`} activeClassName="active">Songs</NavLink> 
        </div>
      );
    default:
      return null;
  }
};

export default withRouter(connect(msp, null)(Navbar));
