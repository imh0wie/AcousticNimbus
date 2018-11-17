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
        if (this.props.klass !== "user-show-page") {
            this.props.fetchUsers();
        }
        this.setState({
            loading: false,
        })
        // this.props.fetchUsers().then(this.setState({loading: false}));
    }

    render() {
        if (this.state.loading) {
            return <img src={window.loadingPizza}></img>
        } else {
            if (!this.props.items || this.props.items.length === 0) return <p className="ui-msg">No love...:(</p>;
            return (
                <ul>
                    {this.props.items.map((item) => {
                        const id = item.likerId ? item.likerId : item.followerId ;
                        if (!this.props.users[id]) return null;
                        return (
                            <BubblesListItem
                                key={id}
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