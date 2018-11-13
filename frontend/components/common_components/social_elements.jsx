import React from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { fetchLikes, createLike, removeLike } from "../../actions/like_actions";
import { createFollow, removeFollow } from "../../actions/follow_actions";
import { fetchUsers } from "../../actions/user_actions";
import { likesOf, likeOf } from "../../util/like_api_util";
import { followOf } from "../../util/follow_api_util";
import { commentsOf } from "../../util/comment_api_util";

const msp = (state, ownProps) => {
    const onPageSongId = parseInt(ownProps.match.params.songId) || ownProps.songId;
    const onPageArtistId = parseInt(ownProps.match.params.userId);
    const likes = state.entities.likes;
    const currentUserId = state.session.id;
    return ({
        currentLikes: likesOf("Song", onPageSongId, likes),
        currentLike: likeOf("Song", onPageSongId, state.entities.users[currentUserId], likes),
        currentFollow: followOf(onPageArtistId, currentUserId, state.entities.follows),
        currentComments: commentsOf(onPageSongId, state.entities.comments),
        onPageArtistId: onPageArtistId,
        onPageSongId: onPageSongId,
        currentUserId: currentUserId,
    });
}

const mdp = (dispatch) => {
    return ({
        fetchLikes: () => dispatch(fetchLikes()),
        createLike: (like) => dispatch(createLike(like)),
        removeLike: (id) => dispatch(removeLike(id)),
        createFollow: (follow) => dispatch(createFollow(follow)), 
        removeFollow: (id) => dispatch(removeFollow(id)), 
        fetchUsers: () => dispatch(fetchUsers()),
    })
}

class SocialElements extends React.Component {
    constructor(props) {
        super(props);
        this.noneStyle = {
            display: "none"
        }
        this.handleFollow = this.handleFollow.bind(this);
    }

    componentDidMount() {
        if (this.props.klass === "banner-player") this.props.fetchLikes();
    }

    handleLike(e) {
        e.preventDefault();
        if (this.props.currentLike) {
            this.props.removeLike(this.props.currentLike.id);
        } else {
            const like = {
                likeable_type: "Song",
                likeable_id: this.props.onPageSongId,
                liker_id: this.props.currentUserId,
            }
            this.props.createLike(like);
        }
    }
    
    handleFollow(e) { // for user show page
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
                        <button 
                            className={this.props.currentFollow ? "following" : "follow"}
                            onClick={(e) => this.handleFollow(e)}
                            style={this.props.onPageArtistId === this.props.currentUserId ? this.noneStyle : {}}
                        >
                                {this.props.currentFollow ? "Following" : "Follow"}
                        </button>
                    </div>
                );
        }
    }

    renderSocialData() {
        switch (this.props.klass) {
            case "banner-player":
                if (!this.props.currentLikes) return null;
                return (
                    <div className="right">
                        <p><i className="fas fa-heart"></i> {this.props.currentLikes.length}</p> 
                    </div>
                );
            case "item-player":
                if (!this.props.currentComments) return null;
                return (
                    <div className="right">
                        <Link to={`/songs/${this.props.onPageSongId}`}><i className="fas fa-comment-alt"></i>{this.props.currentComments.length}</Link> 
                    </div>
                );
            case "user-show-page":
                return null;
        }
    }

    render() {
        if (this.props.klass === "none") return <div></div>;
        return (
            <div className="social-els">
                {this.renderButtons()}
                {this.renderSocialData()}
            </div>
        );
       
        
    }
}

export default withRouter(connect(msp, mdp)(SocialElements));