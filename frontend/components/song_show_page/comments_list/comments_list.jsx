import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { emptyCommentsOfSpecificSong } from "../../../actions/comment_actions";
import CommentsListItem from "./comments_list_item";

const msp = (state) => {
    return ({
        comments: state.entities.comments,
    });
}

const mdp = (dispatch) => {
    return ({
        emptyCommentsOfSpecificSong: (defaultState) => dispatch(emptyCommentsOfSpecificSong(defaultState)),
    });
}

class CommentsList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            currentComments: Object.values(this.props.song.comments).reverse(),
        }
    }

    componentDidMount() {
        setTimeout(() => this.setState({
            loading: false,
        }), 2000);
    }

    componentWillReceiveProps(nextProps) {
        if ((!this.props.comments && nextProps.comments) || (nextProps.comments && nextProps.comments.commentsOfSpecificSong && this.state.currentComments.length !== Object.keys(nextProps.comments.commentsOfSpecificSong).length)) {
            this.setState({
                currentComments: Object.values(nextProps.comments.commentsOfSpecificSong[this.props.songId]).reverse(),
            })
        }
    }

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
        } 
    }
}

export default withRouter(connect(msp, mdp)(CommentsList));