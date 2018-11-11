import React from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { fetchLikes, createLike, removeLike } from "../../actions/like_actions";
import { fetchUsers } from "../../actions/user_actions";
import { likesOf, likeOf } from "../../util/like_api_util";

const msp = (state, ownProps) => {
    const songId = ownProps.songId;
    const likes = state.entities.likes;
    const currentUserId = state.session.id;
    const currentUser = state.entities.users[currentUserId];
    debugger
    return ({
        likes: likes,
        currentLike: likeOf("Song", songId, currentUser, likes),
        currentLikes: likesOf("Song", songId, likes),
        currentUserId: currentUserId,
        currentUser: currentUser,
    });
}

const mdp = (dispatch) => {
    return ({
        fetchLikes: () => dispatch(fetchLikes()),
        createLike: (like) => dispatch(createLike(like)),
        removeLike: (id) => dispatch(removeLike(id)),
        fetchUsers: () => dispatch(fetchUsers()),
    })
}

class SocialElements extends React.Component {
    constructor(props) {
        super(props);
        this.handleFollow = this.handleFollow.bind(this);
    }

    componentDidMount() {
        if (this.props.klass === "banner-player") {
            this.props.fetchLikes();
        }
    }

    handleLike(e) {
        e.preventDefault();
        if (this.props.currentLike) {
            this.props.removeLike(this.props.currentLike.id);
        } else {
            const like = {
                likeable_type: "Song",
                likeable_id: this.props.songId,
                liker_id: this.props.currentUserId,
            }
            debugger
            this.props.createLike(like);
        }
    }

    handleFollow(e) {
        e.preventDefault();
        if (this.props.currentFollow) {
          this.props.removeFollow(this.props.currentFollow.id);
        } else {
            const follow = {
                followed_user_id: this.props.onPageArtistId,
                follower_id: this.props.currentUserId
            }
            this.props.createFollow(follow);
        }
    }

    renderButtons() {
        switch (this.props.klass) {
            case "banner-player":
                return (
                    <div className="left">
                        <button className={this.props.currentLike ? "liked-button" : "like-button"} onClick={(e) => this.handleLike(e)}><i className="fas fa-heart"></i> {this.props.currentLike ? "Liked" : "Like"}</button>
                    </div>
                );
            case "item-player":
                return (
                    <div className="left">
                        <p className={this.props.currentLike ? "liked-button" : "like-button"} onClick={(e) => this.handleLike(e)}><i className="fas fa-heart"></i> {this.props.currentLikes.length}</p>
                    </div>
                );
            case "user-show-page":
                return (
                    <div className="buttons">
                        <button className={this.props.currentFollow ? "following" : "follow"} onClick={(e) => this.handleFollow(e)}>{this.props.currentFollow ? "Following" : "Follow"}</button>
                    </div>
                );
        }
    }

    renderSocialData() {
        switch (this.props.klass) {
            case "banner-player":
                return (
                    <div className="right">
                        <p><i className="fas fa-heart"></i> {this.props.currentLikes.length}</p> 
                    </div>
                );
            case "item-player":
                return (
                    <div className="right">
                        <Link to={`/songs/${this.props.songId}`}><i className="fas fa-comment-alt"></i>{this.props.currentComments.length}</Link> 
                    </div>
                );
            case "user-show-page":
                return null;
        }
    }

    render() {
        if (this.props.klass === "none") return <div></div>;
        debugger
        return (
            <div className="social-els">
                {this.renderButtons()}
                {this.renderSocialData()}
            </div>
        );
       
        
    }
}

export default withRouter(connect(msp, mdp)(SocialElements));