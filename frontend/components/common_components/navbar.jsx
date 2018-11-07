import React from "react";
import { NavLink, withRouter } from "react-router-dom";

class Navbar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    switch (this.props.klass) {
      case "homepage":
        return (
          <div className="navbar">
            <NavLink to="/stream" activeClassName="active" onClick={() => this.switchTabFrom("stream")}>Stream</NavLink> 
            <NavLink to="/charts/top" activeClassName="active" onClick={() => this.switchTabFrom("charts")}>Charts</NavLink>
          </div>
        );
      case "user-show-page":
        return (
          <div className="navbar">
            <NavLink to={`/users/${this.props.onPageArtistId}`} activeClassName="active" onClick={() => this.switchTabFrom("stream")}>Songs</NavLink> 
          </div>
        );
      default:
        break;
    }
  }
};


// <ul className="homepage-navbar">
//   <li className="homepage-navbar-button-container">
//     <h2 className="homepage-navbar-button" onClick={() => this.props.history.push("/stream")}>Stream</h2>
//   </li>
//   <li className="homepage-navbar-button-container">
//     <h2 className="homepage-navbar-button" onClick={() => this.props.history.push("/charts/top")}>Charts</h2>
//   </li>
// </ul>


// <iframe src="https://giphy.com/embed/wsWcsrfMXjJgk" width="480" height="264" frameBorder="0" className="giphy-embed" allowFullScreen></iframe>
// <img src="slideshow-img1.jpg" alt="img1" className="header-background"></img>
// <img src="images/header-background.gif" alt="header-background" className="header-background"></img>
export default withRouter(Navbar);
