import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { fetchUsers } from "../../../actions/user_actions";
import BubblesListItem from "./bubbles_list_item";

const msp = (state) => {
    return ({
        users: state.entities.users,
    })
}

const mdp = (dispatch) => {
    return ({
        fetchUsers: () => dispatch(fetchUsers()),
    });
}

class BubblesList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
        }
    }

    componentDidMount() {
        this.props.fetchUsers();
        this.setState({
            loading: false,
        })
    }

    render() {
        debugger
        if (this.state.loading) {
            return <img src={window.loading5}></img>
        } else {
            debugger
            if (this.props.items.length === 0) return <p className="ui-msg">No love...:(</p>;
            return (
                <ul>
                    {this.props.items.map((item) => {
                        const id = item.likerId ? item.likerId : item.followerId ;
                        return (
                            <BubblesListItem
                                user={this.props.users[id]}
                            />
                        );
                    })}
                </ul>
            );
        }
    }
}

export default withRouter(connect(msp, mdp)(BubblesList));