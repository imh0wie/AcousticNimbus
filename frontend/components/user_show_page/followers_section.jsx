import React from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { followsOf } from "../../util/follow_api_util";
import BubblesList from "../common_components/bubbles_list/bubbles_list";

const msp = (state, ownProps) => {
    return ({
        currentFollows: followsOf(parseInt(ownProps.match.params.userId), state.entities.follows), 
        // not grabbing followers directly for transition between header and content (loading)
    });
}

const FollowersSection = (props) => {
    return (
        <div className="followers-section">
            <div className="header">
                <p><i className="fas fa-user"></i> {props.currentFollows ? props.currentFollows.length : "0"} {(!props.currentFollows || !(props.currentFollows.length > 1)) ? "follower" : "followers"}</p>
                <Link to="" onClick={(e) => e.preventDefault()}>View all</Link>
            </div>
            <BubblesList klass="user-show-page" items={props.currentFollows} />
        </div>
    );
}

export default withRouter(connect(msp, null)(FollowersSection))