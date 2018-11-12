import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { createComment } from "../../actions/comment_actions";

const msp = (state, ownProps) => {
    const currentUserId = state.session.id;
    return ({
        songId: parseInt(ownProps.match.params.songId) || ownProps.songId,
        currentSong: state.ui.currentSong,
        currentUserId: currentUserId,
        currentUser: state.entities.users[currentUserId],
    })
}

const mdp = (dispatch) => {
    return ({
        createComment: (comment) => dispatch(createComment(comment)),
    })
}

class CommentBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            body: "",
            song_id: this.props.songId,
            song_progress: null,
            commenter_id: this.props.currentUserId
        }
        this.handleComment = this.handleComment.bind(this);
        this.update = this.update.bind(this);
    }

    handleComment(e) {
        e.preventDefault();
        this.props.createComment(this.state);
        this.setState({
            body: "",
            song_id: this.props.songId,
            song_progress: null,
            commenter_id: this.props.currentUserId
        })
    }
    
    update(field) {
        return (e) => {
            const elapsed = this.props.currentSong.song && this.props.currentSong.song.id === this.props.songId ? this.props.currentSong.elapsed : 0;
            this.setState({ 
                [field]: e.currentTarget.value,
                song_progress: elapsed,
            });
        };
    }

    

    render() {
        if (this.props.klass === "banner-player") return null;
        switch (this.props.klass) {
            case "banner-player":
                this.className = "comment-box-container"
                break;
            case "item-player":
                if (this.props.currentSong.song && this.props.currentSong.song.id === this.props.songId) {
                    this.className = "comment-box-container";
                } else {
                    this.className = "comment-box-container-hidden";
                }
                break;
            case "song-show-page":
                this.className = "comment-box-container"
                break;
            default:
                break;
        }
        return (
            <div className={this.className}>
                <img src={this.props.currentUser.imageURL ? this.props.currentUser.imageURL : window.user_dp} className="comment-box-img"></img>
                <form>
                    <input type="text" value={this.state.body} name="comment" placeholder="Write a comment" className={this.props.klass === "item-player" ? "comment-popup" : "comment-box"} onChange={this.update("body")} />
                    <input type="submit" className="submit-button" tabIndex="-1" onClick={(e) => this.handleComment(e)}/>
                </form>
            </div>
        );
    }
}

export default withRouter(connect(msp, mdp)(CommentBox));

