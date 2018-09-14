import React from 'react';
import HeaderButtons from "../header_buttons/header_buttons_container";

class HeaderBar extends React.Component {
  render () {
    // const bar = () => {

      if (this.props.currentUser) {
        return (
          <header>
            <img src="logo.jpg" alt="logo" className="logo-after-login"></img>
            <Link to="/stream" className="header-collection">Collection</Link>
            <HeaderButtons />
          </header>
        );
      } else {
        return (
          <header className="homepage-header">
            <img src={window.logo} className="logo-before-login"></img>
            <h2 className="logoname-before-login">ACOUSTIC NIMBUS</h2>
            <HeaderButtons />
          </header>
        );
      }
    // }
  }
}

export default HeaderBar;

// <iframe src="https://giphy.com/embed/wsWcsrfMXjJgk" width="480" height="264" frameBorder="0" className="giphy-embed" allowFullScreen></iframe>
// <img src="slideshow-img1.jpg" alt="img1" className="header-background"></img>
// <img src="images/header-background.gif" alt="header-background" className="header-background"></img>
