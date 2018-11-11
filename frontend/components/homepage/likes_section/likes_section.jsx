import React from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { fetchLikes } from "../../../actions/like_actions";
import { likesBy } from "../../../util/like_api_util";
import MiniList from "../../common_components/mini_list/mini_list";

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
        this.state = {
            loading: false,
        }
    }

    componentDidMount() {
        this.props.fetchLikes();
    }

    renderList() {
        if (this.state.loading) {
            debugger
            return <img src={window.loading5}></img>;
        } else {
            debugger
            return (
                <MiniList
                klass="likes-section"
                latestThreeLikes={this.props.latestThreeLikes} 
                />
            );
        }
    }

    render () {
        return (
            <div className="likes-section">
                <div className="header">
                    <p><i className="fas fa-heart"></i> {this.props.currentLikes ? this.props.currentLikes.length : "n"} likes</p>
                    <Link to="">View all</Link>
                </div>
                {this.renderList()}
            </div>
        );
    } 
}

export default withRouter(connect(msp, mdp)(LikesSection));