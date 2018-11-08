import React from "react";

class SearchBar extends React.Component {
  render() {
    return (
      <form className="box-container">
          <input type="text" placeholder="Search for songs, artists (disabled)"/>
          <button onClick={() => this.props.openModal("signup")}></button>
      </form>
    );
  }
}

export default SearchBar;
