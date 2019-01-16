import React from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { fetchLikes, createLike, removeLike } from "../../actions/like_actions";
import { createFollow, removeFollow } from "../../actions/follow_actions";
import { fetchUsers, emptyLikersOfSpecificSong } from "../../actions/user_actions";
import { likesOf, likeOf } from "../../util/like_api_util";
import { followOf } from "../../util/follow_api_util";
import { commentsOf } from "../../util/comment_api_util";

const msp = (state, ownProps) => {
    const onPageArtistId = parseInt(ownProps.match.params.userId);
    const likes = state.entities.likes;
    const users = state.entities.users;
    const follows = state.entities.follows;
    const currentUserId = state.session.id;
    return ({
        songs: state.entities.songs,
        follows: follows,
        likes: likes,
        comments: state.entities.comments,
        users: users,
        onPageArtistId: onPageArtistId,
        currentUserId: currentUserId,
        currentUser: users[currentUserId],
    });
}

const mdp = (dispatch) => {
    return ({
        fetchLikes: () => dispatch(fetchLikes()),
        createLike: (like) => dispatch(createLike(like)),
        removeLike: (like) => dispatch(removeLike(like)),
        createFollow: (follow) => dispatch(createFollow(follow)), 
        removeFollow: (id) => dispatch(removeFollow(id)), 
        emptyLikersOfSpecificSong: (defaultState) => dispatch(emptyLikersOfSpecificSong(defaultState)),
    })
}

class SocialElements extends React.Component {
    constructor(props) {
        super(props);
        this.noneStyle = {
            display: "none"
        }
        switch (this.props.klass) {
            case "item-player":
                this.state = {
                    itemId: null,
                    currentLike: this.props.likes ? likeOf(this.props.currentUserId, "Song", this.props.songId, this.props.likes) : likeOf(this.props.currentUserId, "Song", this.props.songId, this.props.song.likes),
                    likesCount: this.props.song.likesCount,
                    commentsCount: this.props.song.commentsCount,
                }
                break;
            case "user-show-page":
                this.state = {
                    currentFollow: this.props.follows ? followOf(this.props.onPageArtistId, this.props.follows) : (this.props.users.individualUser[this.props.onPageArtistId] ? this.props.users.individualUser[this.props.onPageArtistId].attentions[this.props.currentUserId] : null),
                };
                break;
            case "banner-player":
                this.state = {
                    currentLike: this.props.likes ? Object.values(this.props.likes).find(like => like.likeableId === this.props.songId) : Object.values(this.props.song.likes).find(like => like.likeableId === this.props.songId),
                    likesCount: this.props.song.likesCount,
                };
                break;
            default:
                break;
        }
        this.handleFollow = this.handleFollow.bind(this);
    }

    componentDidMount() {
        // if (this.props.klass === "banner-player") this.props.fetchLikes();
    }

    componentWillReceiveProps(nextProps) {
        switch (this.props.klass) {
            case "item-player":
                if (!this.props.likes || Object.keys(this.props.likes).length !== Object.keys(nextProps.likes).length) {
                    if (!this.state.currentLike) {
                        this.setState({
                            currentLike: likeOf(nextProps.currentUserId, "Song", nextProps.songId, nextProps.likes),
                        })
                    }
                }
                if (nextProps.comments && nextProps.comments.commentsOfSpecificSong && nextProps.comments.commentsOfSpecificSong[this.props.songId] && this.state.commentsCount !== Object.keys(nextProps.comments.commentsOfSpecificSong[this.props.songId]).length) {
                    this.setState({
                        commentsCount: this.state.commentsCount + 1,
                    });
                }
                break;
            case "user-show-page":
                if ((!this.props.follows && nextProps.follows) || (this.props.follows && nextProps.follows && Object.keys(this.props.follows.interests).length !== Object.keys(nextProps.follows.interests).length)) {
                    if (this.state.currentFollow) {
                        this.setState({
                            currentFollow: null,
                        });
                    } else {
                        this.setState({
                            currentFollow: Object.values(nextProps.follows.interests).find(interest => interest.followedUserId === this.props.onPageArtistId),
                        });
                    }
                }
                break;
            case "banner-player":
                if (!this.props.likes || Object.keys(this.props.likes).length !== Object.keys(nextProps.likes).length) {
                    if (!this.state.currentLike) {
                        this.setState({
                            currentLike: likeOf(nextProps.currentUserId, "Song", nextProps.songId, nextProps.likes),
                        })
                    }
                }
                break;
            default:
                break;
        }
    }

    handleLike(e) {
        e.preventDefault();
        if (this.state.currentLike) {
            this.props.removeLike(this.state.currentLike).then(this.setState({
                likesCount: this.state.likesCount - 1,
                currentLike: null,
            }));
        } else {
            const like = {
                likeable_type: "Song",
                likeable_id: this.props.songId,
                liker_id: this.props.currentUserId,
            };
            this.props.createLike(like).then(this.setState({
                likesCount: this.state.likesCount + 1,
                // currentLike: likeOf(this.props.currentUserId, "Song", this.props.songId, this.props.likes),
            }));
        }
        this.defaultState = {
            randomThree: this.props.users && this.props.users.randomThree ? this.props.users.randomThree : null,
            [this.props.currentUserId]: this.props.currentUser,
            individualUser: this.props.users && this.props.users.individualUser ? this.props.users.individualUser : null,
            followersOfSpecificUser: this.props.users && this.props.users.followersOfSpecificUser ? this.props.users.followersOfSpecificUser : null,
            likersOfSpecificSong: null,
        };
    }
    
    handleFollow(e) { // for user show page
        e.preventDefault();
        if (this.state.currentFollow) {
            this.props.removeFollow(this.state.currentFollow);
            this.setState({
                likesCount: this.state.likesCount - 1,
                currentLike: null,
            });
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
                        <button className={this.state.currentLike ? "liked-button" : "like-button"} onClick={(e) => this.handleLike(e)}><i className="fas fa-heart"></i> {this.state.currentLike ? "Liked" : "Like"}</button>
                    </div>
                );
            case "item-player":
                return (
                    <div className="left">
                        <p className={this.state.currentLike ? "liked-button" : "like-button"} onClick={(e) => this.handleLike(e)}><i className="fas fa-heart"></i> {this.state.likesCount}</p>
                    </div>
                );
            case "user-show-page":
                return (
                    <div className="buttons">
                        <button 
                            className={this.state.currentFollow ? "following" : "follow"}
                            onClick={(e) => this.handleFollow(e)}
                            style={this.props.onPageArtistId === this.props.currentUserId ? this.noneStyle : {}}
                        >
                                {this.state.currentFollow ? "Following" : "Follow"}
                        </button>
                    </div>
                );
            default:
                break;
        }
    }

    renderSocialData() {
        switch (this.props.klass) {
            case "banner-player":
                return (
                    <div className="right">
                        <p><i className="fas fa-heart"></i> {this.state.likesCount}</p> 
                    </div>
                );
            case "item-player":
                return (
                    <div className="right">
                        <Link to={`/songs/${this.props.songId}`}><i className="fas fa-comment-alt"></i> {this.state.commentsCount}</Link> 
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