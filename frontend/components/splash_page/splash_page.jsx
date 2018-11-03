import React from "react";
import Modal from "../common_components/modal";
import Banner from "./banner";
import SearchBar from "./search_bar/search_bar";
import SongsIndex from "./songs_index/songs_index";
 
const SplashPage = () => {
  return (
    <div className="splash-page-container">
      <div className="splash-page-header-container">
        <Modal />
        <Banner />
        <SearchBar /> 
      </div>
      <h2 className="splash-page-content-header">Hear what’s trending for free in the AcousticNimbus community</h2>
      <div className="splash-page-content-container">
        <SongsIndex />
      </div>
    </div>
  );
}


export default SplashPage;
