import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { fetchUsers } from "../../../../actions/user_actions";
import LikesListItem from "./likes_list_item";

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

class LikesList extends React.Component {
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
            if (this.props.likes.length === 0) return <p className="ui-msg">No love...:(</p>;
            return (
                <ul>
                    {this.props.likes.map((like) => {
                        return (
                            <LikesListItem
                                liker={this.props.users[like.likerId]}
                            />
                        );
                    })}
                </ul>
            );
        }
    }
}

export default withRouter(connect(msp, mdp)(LikesList));