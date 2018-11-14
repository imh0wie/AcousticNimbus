import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import FilterBar from "./filter_bar/filter_bar";
import SongsRanking from "./songs_ranking/songs_ranking";
// import Navbar from "../../common_components/navbar";

const msp = (state) => {
  return ({
    order: state.ui.charts.order,
  })
}

class ChartsPage extends React.Component {
  constructor(props) {
    super(props);
    this.renderFiltersMessage = this.renderFiltersMessage.bind(this);
  }

  renderFiltersMessage() {
    if (this.props.order === "newest") {
      return <p className="filters-message">Newest & Hottest songs on AcousticNimbus</p>;
    } else {
      return <p className="filters-message">The most played songs on AcousticNimbus</p>;
    }
  }

  render() {
    return (
      <div className="charts-page">
        <FilterBar />
        {this.renderFiltersMessage()}
        <div className="charts-songs-list-labels">
          <p className="charts-songs-list-label">#</p>
          <p className="charts-songs-list-label">Song</p>
        </div>
        <SongsRanking
          order={this.props.order}
        />
      </div>
    );
  }
}

export default withRouter(connect(msp, null)(ChartsPage));