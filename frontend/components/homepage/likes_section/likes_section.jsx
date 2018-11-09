import React from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { fetchLikes } from "../../../actions/like_actions";
import { likesBy } from "../../../util/like_api_util";
import LikesList from "./likes_list";

const msp = (state) => {
    const currentUserId = state.session.id;
    const likes = state.entities.likes;
    const currentLikes = likesBy(likes, currentUserId);
    return ({
        likes: likes,
        currentLikes: currentLikes,
        latestThreeLikes: currentLikes ? currentLikes.slice(0, 3) : null,
    });
}

const mdp = (dispatch) => {
    return ({
        fetchLikes: () => dispatch(fetchLikes()),
    })
}

class LikesSection extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.fetchLikes();
    }

    render () {
        if (this.props.currentLikes) {
            return (
                <div className="likes-section">
                    <div className="header">
                        <p><i className="fas fa-heart"></i> {this.props.currentLikes.length} likes</p>
                        <Link to="">View all</Link>
                    </div>
                    <LikesList  
                    likes={this.props.likes}
                    latestThreeLikes={this.props.latestThreeLikes} 
                    />
                </div>
            );
        } else {
            return <img src={window.loading5}></img>;
        }
        
    } 
}

export default withRouter(connect(msp, mdp)(LikesSection));