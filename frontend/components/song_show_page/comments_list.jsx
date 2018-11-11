import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { fetchComments } from "../../actions/comment_actions";
import { commentsOf } from "../../util/comment_api_util";
import CommentsListItem from "./comments_list_item";

const msp = (state, ownProps) => {
    const comments = state.entities.comments;
    const songId = ownProps.songId;
    return ({
        users: state.entities.users,
        comments: state.entities.comments,
        currentComments: commentsOf(songId, comments),
    });
}

const mdp = (dispatch) => {
    return ({
        fetchComments: () => dispatch(fetchComments()),
    });
}

class CommentsList extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.fetchComments();
    }

    render() {
        if (this.props.currentComments.length === 0) {
            return (
              <div className="comments-none">
                <img src={window.message}></img>
                <h3>Seems a little quiet over here</h3>
                <h4>Be the first to comment on this song</h4>
              </div>
            );
          } else {
            const commentsHeader = this.props.currentComments.length > 1 ? `${this.props.currentComments.length} comments` : "1 comment";
            return (
              <div className="comments">
                <p className="header">{commentsHeader}</p>
                <ul className="song-show-page-comments-list">
                  {this.props.currentComments.map((comment) => {
                      return (
                      <CommentsListItem
                      key={comment.id}
                      comment={comment}
                      commenter={this.props.users[comment.commenterId]}
                      onPageSong={this.props.onPageSong}
                      />
                      );
                  })}
                </ul>
              </div>
            );
          }
    }
}

export default withRouter(connect(msp, mdp)(CommentsList));