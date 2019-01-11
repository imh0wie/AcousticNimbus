import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { emptyCommentsOfSpecificSong, fetchCommentsOfSpecificSong } from "../../../actions/comment_actions";
import { commentsOf } from "../../../util/comment_api_util";
import { isEmpty } from "../../../util/general_api_util";
import CommentsListItem from "./comments_list_item";

const msp = (state, ownProps) => {
    const comments = state.entities.comments;
    const songId = parseInt(ownProps.match.params.songId);
    return ({
        users: state.entities.users,
        comments: state.entities.comments,
        // currentComments: commentsOf(songId, comments),
    });
}

const mdp = (dispatch) => {
    return ({
        emptyCommentsOfSpecificSong: (defaultState) => dispatch(emptyCommentsOfSpecificSong(defaultState)),
        fetchCommentsOfSpecificSong: (songId) => dispatch(fetchCommentsOfSpecificSong(songId)),
    });
}

class CommentsList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            currentComments: Object.values(this.props.song.comments),
            // currentComments: this.props.comments && this.props.comments.commentsOfSpecificSong ? Object.values(this.props.comments.commentsOfSpecificSong) : null,
        }
    }

    componentDidMount() {
        this.setState({
            loading: false,
        })
    }

    componentWillReceiveProps(nextProps) {
        if ((!this.props.comments && nextProps.comments) || (nextProps.comments && this.state.currentComments.length !== Object.keys(nextProps.comments.commentsOfSpecificSong).length)) {
        // if ((!this.props.comments && nextProps.comments) || (this.props.comments && nextProps.comments && Object.keys(this.props.comments.commentsOfSpecificSong).length !== Object.keys(nextProps.comments.commentsOfSpecificSong).length)) {
            this.setState({
                currentComments: Object.values(nextProps.comments.commentsOfSpecificSong[this.props.songId]),
            })
            // if (this.state.followed) {
            //     const idx = this.state.followers.findIndex(follower => follower.id === this.props.currentUserId);
            //     this.setState({
            //         followers: this.state.followers.length === 1 ? [] : this.state.followers.slice(0, idx).concat(this.state.followers.slice(idx + 1)),
            //         followed: !this.state.followed,
            //     });
            // } else {
            //     this.setState({
            //         followers: this.state.followers.concat([this.props.currentUser]),
            //         followed: !this.state.followed,
            //     });
            // }
        }
    }

    // componentDidMount() {
    //     const defaultState = {
    //         commentsOfSpecificSong: null,
    //     };
    //     this.props.emptyCommentsOfSpecificSong(defaultState);
    // }
    
    // componentWillReceiveProps(nextProps) {
    //     if (!this.props.comments && nextProps.comments && Object.keys(nextProps.comments).includes("commentsOfSpecificSong") && !nextProps.comments.commentsOfSpecificSong) {
    //         this.props.fetchCommentsOfSpecificSong(this.props.songId);
    //     } else if ((!this.props.comments.commentsOfSpecificSong && nextProps.comments.commentsOfSpecificSong) || (nextProps.comments && nextProps.comments.commentsOfSpecificSong[this.props.songId] && this.state.currentComments.length !== Object.keys(nextProps.comments.commentsOfSpecificSong[this.props.songId]).length)) {
    //     // } else if ((!this.props.comments.commentsOfSpecificSong && nextProps.comments.commentsOfSpecificSong) || (this.props.comments && this.props.comments.commentsOfSpecificSong && nextProps.comments && nextProps.comments.commentsOfSpecificSong && Object.keys(this.props.comments.commentsOfSpecificSong).length !== Object.keys(nextProps.comments.commentsOfSpecificSong).length)) {
    //         this.setState({
    //             loading: false,
    //             currentComments: Object.values(nextProps.comments.commentsOfSpecificSong[this.props.songId]),
    //         });
    //     }
    // }

    componentWillUnmount() {
        const defaultState = {
            commentsOfSpecificSong: null,
        };
        this.props.emptyCommentsOfSpecificSong(defaultState);
    }

    render() {
        if (this.state.loading || !this.state.currentComments) {
            return <img src={window.loadingPizza} className="loading"></img>;
        } else {
            if (this.state.currentComments.length === 0) {
                return (
                  <div className="comments-none">
                    <img src={window.message}></img>
                    <h3>Seems a little quiet over here</h3>
                    <h4>Be the first to comment on this song</h4>
                  </div>
                );
            } else {
                const commentsHeader = this.state.currentComments.length > 1 ? `${this.state.currentComments.length} comments` : `${this.state.currentComments.length} comment`;
                return (
                    <div className="comments">
                    <p className="header">{commentsHeader}</p>
                    <ul>
                        {this.state.currentComments.map((comment) => {
                            return (
                            <CommentsListItem
                            key={comment.id}
                            comment={comment}
                            commenter={comment.commenter}
                            song={this.props.song}
                            songId={this.props.songId}
                            songArtist={this.props.songArtist}
                            />
                            );
                        })}
                    </ul>
                    </div>
                );
            }
            // if (isEmpty(this.props.comments) || this.props.currentComments.length === 0) {
            //     return (
            //       <div className="comments-none">
            //         <img src={window.message}></img>
            //         <h3>Seems a little quiet over here</h3>
            //         <h4>Be the first to comment on this song</h4>
            //       </div>
            //     );
            // } else {
            //     const commentsHeader = this.props.currentComments.length > 1 ? `${this.props.currentComments.length} comments` : "1 comment";
            //     return (
            //         <div className="comments">
            //         <p className="header">{commentsHeader}</p>
            //         <ul>
            //             {this.props.currentComments.map((comment) => {
            //                 return (
            //                 <CommentsListItem
            //                 key={comment.id}
            //                 comment={comment}
            //                 commenter={this.props.users[comment.commenterId]}
            //                 />
            //                 );
            //             })}
            //         </ul>
            //         </div>
            //     );
            // }
        }
        
    }
}

export default withRouter(connect(msp, mdp)(CommentsList));