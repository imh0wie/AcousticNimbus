import React from "react";

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    return (
        <div className="splash-page-search-bar">
          <form className="search-box-container">
              <input type="text" placeholder="Search for songs, artists"
              className="search-box"  onClick={() => this.props.openModal("signup")}/>
              <button className="search-box-submit-button"></button>
          </form>
          <h4 className="search-box-separator">or</h4>
          <button className="splash-page-upload-button" onClick={() => this.props.openModal("signup")}>Upload your own</button>
        </div>
    );
  }
}

export default SearchBar;
