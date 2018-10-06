import React from "react";
import { connect } from "react-router-dom";
import NewestListItem from "./newest_list_item";

const msp = (state) => {
  return ({
    byRelease: state.songs.byRelease,
  });
};

class NewestList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="newest-list-container">
        <ul className="newest-list">
          {this.props.byRelease.map((song) => {
            return <NewestListItem key={song.id} song={song} />;
          })}
        </ul>
      </div>
    );
  }
}

export default connect(msp)(NewestList);
