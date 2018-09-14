import React from 'react';
import HeaderButtonsContainer from "../header_buttons/header_buttons_container";
// line 21: Should we pass in currentUser as props?
class HeaderBar extends React.Component {
  render () {
    // const bar = () => {
    if (this.props.currentUser) {
      return (
        <header>
          <HeaderButtonsContainer />
        </header>
      );
    } else {
      return (
        <header className="homepage-header">
          <img src={window.logo} className="logo-before-login"></img>
          <h2 className="logoname-before-login">ACOUSTIC NIMBUS</h2>
          <HeaderButtonsContainer />
        </header>
      );
    }

    // }
  }
}

// <iframe src="https://giphy.com/embed/wsWcsrfMXjJgk" width="480" height="264" frameBorder="0" className="giphy-embed" allowFullScreen></iframe>
// <img src="slideshow-img1.jpg" alt="img1" className="header-background"></img>
// <img src="images/header-background.gif" alt="header-background" className="header-background"></img>
export default HeaderBar;
