import React from "react";
import { FormGroup, FormControl } from 'react-bootstrap';

class ChartsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      order: "newest",
      genres: "all",
    };
    this.update = this.update.bind(this);
    this.renderFiltersMessage = this.renderFiltersMessage.bind(this);
    this.renderList = this.renderList.bind(this);
  }

  update(field) {
    return (e) => {
      this.setState({ [field]: e.currentTarget.value });
    };
  }

  renderFiltersMessage() {
    if (this.state.order === "Newest") {
      return <p className="filters-message">Newest & Hottest songs on AcousticNimbus</p>;
    } else {
      return <p className="filters-message">The most played songs on AcousticNimbus</p>;
    }
  }

  renderList() {
    if (this.state.order === "Newest") {
      return ;
    } else {
      return ;
    }
  }

  render() {
    return (
      <div className="charts-page-container">
        <div className="filter-bar-container">
          <div className="order-selector-container">
            <FormGroup controlId="orderSelector">
              <FormControl componentClass="select" placeholder="None" className="order-selector" onChange={this.update("order")}>
                  <option value="Newest">Newest</option>
                  <option value="Top30">Top 30</option>
              </FormControl>
            </FormGroup>
          </div>
          <div className="genre-filters-container">
            <FormGroup controlId="genreFilters">
              <FormControl componentClass="select" placeholder="None" className="genre-filters" onChange={this.update("genres")}>
                <option value="All">All genres</option>
                <option value="Acoustic">Acoustic</option>
                <option value="Ambient">Ambient</option>
                <option value="Classical">Classical</option>
                <option value="Country">Country</option>
                <option value="Dance/EDM">Dance/EDM</option>
                <option value="Electronic">Electronic</option>
                <option value="Hip-hop">Hip-hop</option>
                <option value="Jazz">Jazz</option>
                <option value="Metal">Metal</option>
                <option value="Piano">Piano</option>
                <option value="Pop">Pop</option>
                <option value="Soul">Soul</option>
                <option value="Rock">Rock</option>
                <option value="World">World</option>
              </FormControl>
            </FormGroup>
          </div>
        </div>
        {this.renderFiltersMessage}
      </div>
    );
  }
}

export default ChartsPage;
