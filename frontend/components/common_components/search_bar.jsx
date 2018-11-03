import React from "react";
import { connect } from "react-redux";
import { openModal } from "../../actions/modal_actions";

const mdp = (dispatch) => {
  return {
    openModal: (modal) => dispatch(openModal(modal)),
  };
};

class SearchBar extends React.Component {
  constructor(props) {
    super(props);

  }

  openModal() {
    this.props.openModal
  }
  
  render() {
    return (
      <form className="box-container">
          <input type="text" placeholder="Search for songs, artists (disabled)"/>
          <button onClick={() => this.props.openModal("signup")}></button>
      </form>
    );
  }
}

export default connect(null, mdp)(SearchBar);
