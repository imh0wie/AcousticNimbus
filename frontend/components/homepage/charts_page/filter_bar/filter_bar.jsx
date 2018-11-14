import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { changeOrder } from "../../../../actions/chart_actions";
import { FormGroup, FormControl } from 'react-bootstrap';

const msp = (state) => {
    return ({
        order: state.ui.charts.order,
    });
};

const mdp = (dispatch) => {
    return ({
        changeOrder: (order) => dispatch(changeOrder(order)),
    });
};

class FilterBar extends React.Component {
    constructor(props) {
        super(props);
    }
    
    update(field) {
        return (e) => {
            this.props.changeOrder(e.currentTarget.value)
        };
    }

    render() {
        return (
            <div className="filter-bar">
                <FormGroup controlId="orderSelector">
                    <FormControl componentClass="select" placeholder="None" className="order-selector" onChange={this.update("order")}>
                        <option value="newest">Newest</option>
                        {/* <option value="topThirty">Top 30</option> */}
                    </FormControl>
                </FormGroup>
                <FormGroup controlId="genreFilters">
                    <FormControl componentClass="select" placeholder="None" className="genre-filters" onChange={this.update("genres")}>
                    <option value="All">All genres</option>
                    {/* <option value="Acoustic">Acoustic</option>
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
                    <option value="World">World</option> */}
                    </FormControl>
                </FormGroup>
            </div>
        )
    }
}

export default withRouter(connect(msp, mdp)(FilterBar));