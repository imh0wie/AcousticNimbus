import React from 'react';
import ModalContainer from "./modal/modal_container";
import HeaderBarContainer from "./header_bar/header_bar_container";

class HeaderBody extends React.Component {
  render () {
    return (
      <div className="page-header-container">
        <ModalContainer />
        <HeaderBarContainer />
      </div>
    );
  }
}

export default HeaderBody;
