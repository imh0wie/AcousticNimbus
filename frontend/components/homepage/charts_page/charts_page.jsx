import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { resetOrderAndGenre } from "../../../actions/chart_actions";
import FilterBar from "./filter_bar/filter_bar";
import SongsRanking from "./songs_ranking/songs_ranking";

const msp = (state) => {
  return ({
    order: state.ui.charts.order,
  })
}

const mdp = (dispatch) =>  {
  return ({
    resetOrderAndGenre: () => dispatch(resetOrderAndGenre()),
  })
}

class ChartsPage extends React.Component {
  constructor(props) {
    super(props);
    this.renderFiltersMessage = this.renderFiltersMessage.bind(this);
  }

  componentWillUnmount() {
    this.props.resetOrderAndGenre();
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

export default withRouter(connect(msp, mdp)(ChartsPage));