import React from "react";
import SubPagesNavbarButtonsContainer from "../sub_pages_navbar_buttons/sub_pages_bar_buttons_container";
// line 21: Should we pass in currentUser as props?
class SubPagesNavbar extends React.Component {
  render () {
    return (
      <div className="sub-pages-nav-bar">
        <SubPagesNavbarButtonsContainer />
      </div>
    );
  }
}

// <iframe src="https://giphy.com/embed/wsWcsrfMXjJgk" width="480" height="264" frameBorder="0" className="giphy-embed" allowFullScreen></iframe>
// <img src="slideshow-img1.jpg" alt="img1" className="header-background"></img>
// <img src="images/header-background.gif" alt="header-background" className="header-background"></img>
export default SubPagesNavbar;
