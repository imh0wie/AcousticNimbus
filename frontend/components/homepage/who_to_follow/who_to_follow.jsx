import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { fetchRandomThreeUsers, emptyRandomThreeUsers } from "../../../actions/user_actions";
import ArtistsList from "./artists_list";

const msp = (state) => {
    const users = state.entities.users;
    const currentUserId = state.session.id;
    return ({
        users: users,
        currentUser: users[currentUserId],
        currentUserId: currentUserId,
    })
}

const mdp = (dispatch) => {
    return ({
        fetchRandomThreeUsers: (currentUserId) => dispatch(fetchRandomThreeUsers(currentUserId)),
        emptyRandomThreeUsers: (defaultState) => dispatch(emptyRandomThreeUsers(defaultState)),
    });
}

class WhoToFollow extends React.Component {
    constructor(props) {
        super(props);
    }

    refresh() {
        const defaultState = {
            randomThree: null,
            [this.props.currentUserId]: this.props.currentUser,
        };
        this.props.emptyRandomThreeUsers(defaultState);
    }

    render() {
        return (
            <div className="who-to-follow">
                <div className="header"> 
                    <p><i className="fas fa-user-friends"></i> Who to follow</p>
                    <p className="refresh" onClick={() => this.refresh()}><i className="fas fa-redo-alt"></i> Refresh</p>
                </div>
                <ArtistsList currentUserId={this.props.currentUserId}
                             fetchThreeRandomUsers={this.props.fetchThreeRandomUsers} />
            </div>
        );
    }
}
 
export default withRouter(connect(msp, mdp)(WhoToFollow));