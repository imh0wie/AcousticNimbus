import React from "react";
import { FormGroup, FormControl } from 'react-bootstrap';

class ChartsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      order: "newest",
      genres: "All genres",
    };
    this.update = this.update.bind(this);
    this.renderList = this.renderList.bind(this);
  }

  update(field) {
    return (e) => {
      this.setState({ [field]: e.currentTarget.value });
    };
  }

  renderList() {
    if (this.state.order === "newest") {
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
                  <option value="newest">Newest</option>
                  <option value="top30">Top 30</option>
              </FormControl>
            </FormGroup>
            <p>Newest & Hottest songs on AcousticNimbus</p>
          </div>
          <div className="filters-container">
          </div>
        </div>
      </div>
    );
  }
}

export default ChartsPage;
