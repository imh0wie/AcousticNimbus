import React from "react";
import ModalContainer from "../common_components/modal/modal_container";
import BannerContainer from "./banner/banner_container";

const Homepage = () => {
  return (
    <div className="homepage-container">
      <div className="homepage-header-container">
        <ModalContainer />
        <BannerContainer />
      </div>
      <div className="homepage-content-container">
      </div>
    </div>
  );
};

export default Homepage;
