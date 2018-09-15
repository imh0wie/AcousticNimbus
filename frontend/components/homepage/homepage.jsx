import React from "react";
import ModalContainer from "../modal/modal_container";
import HeaderBarContainer from "../header_bar/header_bar_container";

const Homepage = () => {
  return (
    <div className="homepage-container">
      <ModalContainer />
      <HeaderBarContainer />
    </div>
  );
};

export default Homepage;
