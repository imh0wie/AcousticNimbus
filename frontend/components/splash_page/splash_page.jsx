import React from "react";
import Modal from "../common_components/modal";
import Banner from "./banner";
import { connect } from "react-redux"
import { openModal } from "../../actions/modal_actions";
import SearchBar from "../common_components/search_bar";
import SongsIndex from "./songs_index/songs_index";

const mdp = (dispatch) => {
  return ({
    openModal: (modal) => dispatch(openModal(modal)),
  })
}

class SplashPage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="splash-page-container">
        <div className="splash-page-header-container">
          <Modal />
          <Banner />
          <div className="splash-page-search-bar">
            <SearchBar /> 
            <h4>or</h4>
            <button className="upload-button" onClick={() => this.props.openModal("signup")}>Upload your own</button>
          </div>
        </div>
        <h2 className="content-header">Hear what’s trending for free in the AcousticNimbus community</h2>
        <div className="splash-page-content-container">
          <SongsIndex />
        </div>
      </div>
    );
  }
}


export default connect(null, mdp)(SplashPage);
