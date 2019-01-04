import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { fetchThreeRandomUsers } from "../../../actions/user_actions";
import ArtistsList from "./artists_list";

const msp = (state) => {
    return ({
        currentUserId: state.session.id,
    })
}

const mdp = (dispatch) => {
    return ({
        fetchThreeRandomUsers: (currentUserId) => dispatch(fetchThreeRandomUsers(currentUserId)),
    });
}

const WhoToFollow = (props) => {
    return (
        <div className="who-to-follow">
            <div className="header"> 
                <p><i className="fas fa-user-friends"></i> Who to follow</p>
                <p className="refresh" onClick={() => props.fetchThreeRandomUsers(props.currentUserId)}><i className="fas fa-redo-alt"></i> Refresh</p>
            </div>
            <ArtistsList currentUserId={props.currentUserId}
                         fetchThreeRandomUsers={props.fetchThreeRandomUsers} />
        </div>
    );
}
 
export default withRouter(connect(msp, mdp)(WhoToFollow));