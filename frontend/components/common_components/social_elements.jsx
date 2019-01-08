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
    const follows = state.entities.follows;
    const currentUserId = state.session.id;
    return ({
        songs: state.entities.songs,
        follows: follows,
        likes: likes,
        comments: state.entities.comments,
        users: state.entities.users,
        // currentLike: likeOf("Song", onPageSongId, state.entities.users[currentUserId], likes),
        // currentLike: ownProps.klass === "item-player" ? (likes ? likeOf(currentUserId, "Song", onPageSongId, likes) : likeOf(currentUserId, "Song", onPageSongId, ownProps.song.likes)) : null,
        // currentFollow: ownProps.klass === "user-show-page" ? (follows ? followOf(onPageArtistId, follows) : (state.entities.users[onPageArtistId] ? state.entities.users[onPageArtistId].attentions[onPageArtistId] : null)) : null,
        // currentComments: commentsOf(onPageSongId, state.entities.comments),
        // currentComments: state.entities.comments ? state.entities.comments.bySong[onPageSongId] : null,
        onPageArtistId: onPageArtistId,
        onPageSongId: onPageSongId,
        currentUserId: currentUserId,
    });
}

const mdp = (dispatch) => {
    return ({
        fetchLikes: () => dispatch(fetchLikes()),
        createLike: (like) => dispatch(createLike(like)),
        removeLike: (like) => dispatch(removeLike(like)),
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
        switch (this.props.klass) {
            case "item-player":
                this.state = {
                    currentLike: this.props.likes ? likeOf(this.props.currentUserId, "Song", this.props.onPageSongId, this.props.likes) : likeOf(this.props.currentUserId, "Song", this.props.onPageSongId, this.props.song.likes),
                    currentComments: this.props.comments ? this.props.comments.bySong[onPageSongId] : null,
                    likesCount: this.props.song.likesCount,
                    commentsCount: this.props.song.commentsCount,
                }
                break;
            case "user-show-page":
                this.state = {
                    currentFollow: this.props.follows ? followOf(this.props.onPageArtistId, this.props.follows) : (this.props.users.individualUser[this.props.onPageArtistId] ? this.props.users.individualUser[this.props.onPageArtistId].attentions[this.props.onPageArtistId] : null),
                };
                break;
            default:
                break;
        }
        this.handleFollow = this.handleFollow.bind(this);
    }

    componentDidMount() {
        if (this.props.klass === "banner-player") this.props.fetchLikes();
    }

    componentWillReceiveProps(nextProps) {
        debugger
        switch (this.props.klass) {
            case "item-player":
                debugger
                if (!this.props.likes || Object.keys(this.props.likes).length !== Object.keys(nextProps.likes).length) {
                    if (!this.state.currentLike) {
                        this.setState({
                            currentLike: likeOf(nextProps.currentUserId, "Song", nextProps.onPageSongId, nextProps.likes),
                        })
                    }
                    // if (this.state.currentLike) {
                    //     this.setState({
                    //         likesCount: this.state.likesCount - 1,
                    //         currentLike: null,
                    //     });
                    // } else {
                    //     this.setState({
                    //         likesCount: this.state.likesCount + 1,
                    //         currentLike: likeOf(nextP rops.currentUserId, "Song", nextProps.onPageSongId, nextProps.likes)
                    //     });
                    // }
                }
                if (nextProps.currentComments && this.state.commentsCount !== nextProps.currentComments.length) {
                    this.setState({
                        commentsCount: nextProps.currentComments.length,
                    });
                }
                debugger
                break;
            case "user-show-page":
                debugger
                // if ((!this.props.follows && nextProps.follows) || (nextProps.follows && Object.values(this.props.follows.interests).length !== Object.values(nextProps.follows.interests).length)) {
                if (nextProps.follows) {
                    debugger
                    if (this.state.currentFollow) {
                        debugger
                        this.setState({
                            currentFollow: null,
                        })
                    } else {
                        debugger
                        this.setState({
                            currentFollow: Object.values(nextProps.follows.interests).find(interest => interest.followedUserId === nextProps.onPageArtistId),
                            // currentFollow: followOf(nextProps.onPageArtistId, nextProps.follows.interests),
                        })
                        debugger
                    }
                }
                break;
            default:
                break;
        }
    }

    // componentWillReceiveProps(nextProps) {
    //     debugger
    //     switch (this.props.klass) {
    //         case "item-player":
    //             if (nextProps.likes !== this.props.likes) {
    //                 this.setState({
    //                     currentLike: likeOf(nextProps.currentUserId, "Song", nextProps.onPageSongId, nextProps.likes)
    //                 });
    //             }
    //             if (nextProps.currentComments && this.state.commentsCount !== nextProps.currentComments.length) {
    //                 this.setState({
    //                     commentsCount: nextProps.currentComments.length,
    //                 });
    //             }
    //             break;
    //         case "user-show-page":
    //             debugger
    //             if ((!this.props.follows && nextProps.follows) || (nextProps.follows && Object.values(this.props.follows.interests).length !== Object.values(nextProps.follows.interests).length)) {
    //                 debugger
    //                 if (this.state.currentFollow) {
    //                     debugger
    //                     this.setState({
    //                         currentFollow: followOf(this.props.onPageArtistId, nextProps.follows.interests),
    //                     })
    //                 } else {
    //                     debugger
    //                     this.setState({
    //                         currentFollow: null,
    //                     })
    //                 }
    //             }
    //             break;
    //         default:
    //             break;
    //     }
    // }

    handleLike(e) {
        e.preventDefault();
        if (this.state.currentLike) {
            // const like = {
            //     id: this.state.currentLike.id,
            //     likeable_type: this.state.currentLike.likeableType,
            //     likeable_id: this.state.currentLike.likeableId,
            //     liker_id: this.state.currentLike.likerId,
            // }
            this.props.removeLike(this.state.currentLike).then(this.setState({
                likesCount: this.state.likesCount - 1,
                currentLike: null,
            }))
        } else {
            const like = {
                likeable_type: "Song",
                likeable_id: this.props.onPageSongId,
                liker_id: this.props.currentUserId,
            };
            this.props.createLike(like).then(this.setState({
                likesCount: this.state.likesCount + 1,
                // currentLike: likeOf(this.props.currentUserId, "Song", this.props.onPageSongId, this.props.likes),
            }));
        }
    }

    // toggleLike() {
    //     debugger
    //     if (this.state.currentLike) {
    //         this.setState({
    //             likesCount: this.state.likesCount - 1,
    //             currentLike: null,
    //         });
    //     } else {
    //         debugger
    //         this.setState({
    //             likesCount: this.state.likesCount + 1,
    //             currentLike: likeOf(this.props.currentUserId, "Song", this.props.onPageSongId, this.props.likes),
    //         });
    //     }
    // }
    
    handleFollow(e) { // for user show page
        e.preventDefault();
        if (this.state.currentFollow) {
            debugger
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
            debugger
            this.props.createFollow(follow);
            this.setState({
                likesCount: this.state.likesCount + 1,
                // currentLike: likeOf(nextProps.currentUserId, "Song", nextProps.onPageSongId, nextProps.likes)
            });
        }
        // this.toggleFollow();
    }

    // toggleFollow() {
    //     debugger
    //     if (this.state.currentFollow) {
    //         debugger
    //         this.setState({
    //             currentFollow: null,
    //         })
    //     } else {
    //         debugger
    //         this.setState({
    //             currentFollow: followOf(this.props.onPageArtistId, this.props.follows.interests),
    //         })
    //     }
    // }

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
                        {/* <p className={this.props.currentLike ? "liked-button" : "like-button"} onClick={(e) => this.handleLike(e)}><i className="fas fa-heart"></i> {this.props.likes.length}</p> */}
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
        }
    }

    renderSocialData() {
        switch (this.props.klass) {
            case "banner-player":
                if (!this.props.likes) return null;
                return (
                    <div className="right">
                        <p><i className="fas fa-heart"></i> {this.props.likes.length}</p> 
                    </div>
                );
            case "item-player":
                return (
                    <div className="right">
                        <Link to={`/songs/${this.props.onPageSongId}`}><i className="fas fa-comment-alt"></i> {this.state.commentsCount}</Link> 
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