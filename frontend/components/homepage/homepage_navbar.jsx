import React from "react";
import { Link } from "react-router-dom";
// line 21: Should we pass in currentUser as props?

class HomepageNavbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stream: false,
      charts: true,
    };
    // this.toggleState = this.toggleState.bind(this);
  }

  toggleState(tab) {
    debugger
    const tabs = ["stream", "charts"];
    debugger 
    const tabIndex = tabs.indexOf(tab);
    debugger
    if (this.state[tab]) {
      debugger
      return e => this.setState({
        [tab]: true,
        [tabs[(tabIndex + 1) % 2]]: false,
      });
    }
  }

  render() {
    return (
      <div className="navbar-container">
        <ul className="navbar">
          <li className={this.state.stream ? "navbar-button-container clicked" : "navbar-button-container"}>
            <Link to="/stream" className={this.state.stream ? "navbar-button clicked" : "navbar-button"} onClick={this.toggleState("stream")}><h3>Stream</h3></Link> 
          </li>
          <li className={this.state.charts ? "navbar-button-container clicked" : "navbar-button-container"}>
            <Link to="/charts/top" className={this.state.charts ? "navbar-button clicked" : "navbar-button"} onClick={this.toggleState("charts")}><h3>Charts</h3></Link>
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
export default HomepageNavbar;
