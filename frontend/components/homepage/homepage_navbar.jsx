import React from "react";
import { NavLink, withRouter } from "react-router-dom";
// line 21: Should we pass in currentUser as props?

class HomepageNavbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stream: true,
      charts: false
    }
    // this.state = {
    //   stream: false,
    //   charts: true
    // }
  }
  
  switchTabFrom(tab) {
    if ((tab === "stream" && !this.state.stream ) || (tab === "charts" && !this.state.charts)) {
      this.setState({
        stream: !this.state.stream,
        charts: !this.state.charts,
      })
    }
  }

  render() {
    return (
      <div className="navbar-container">
        <ul className="navbar">
          <li className="navbar-button-container">
            <NavLink to="/stream" className="navbar-button" activeClassName="active" onClick={() => this.switchTabFrom("stream")}><h3>Stream</h3></NavLink> 
          </li>
          <li className="navbar-button-container">
            <NavLink to="/charts/top" className="navbar-button" activeClassName="active" onClick={() => this.switchTabFrom("charts")}><h3>Charts</h3></NavLink>
          </li>
        </ul>
      </div>
    );
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
export default withRouter(HomepageNavbar);
