import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { fetchSongs } from "../../../actions/song_actions";
import { fetchComments } from "../../../actions/comment_actions";
import { isEmpty } from "../../../util/general_api_util"
import { likesOf } from "../../../util/like_api_util";
import { commentsOf } from "../../../util/comment_api_util";
import LikesListItem from "./likes_list_item";

const msp = (state) => {
    return ({
        songs: isEmpty(state.entities.songs) ? null : state.entities.songs,
        comments: isEmpty(state.entities.comments) ? null : state.entities.comments,
    })
}

const mdp = (dispatch) => {
    return ({
        fetchSongs: () => dispatch(fetchSongs()),
        fetchComments: () => dispatch(fetchComments()),
    });
}

class LikesList extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.fetchSongs();
        this.props.fetchComments();
    }

    render() {
        debugger
        if (this.props.songs) {
            debugger
            return (
                <ul>
                    {this.props.latestThreeLikes.forEach((like) => {
                        return (
                            <LikesListItem
                            key={like.id}
                            like={like}
                            song={this.props.songs[like.likeableId]}
                            songLikes={likesOf("Song", like.likeableId, this.props.likes)}
                            songComments={commentsOf(like.likeableId, this.props.comments)}
                            />
                        );
                    })}
                </ul>
            );    
        } else {
            debugger
            return (
                <img src={window.loading5}></img>
            );
        }

    }
}

export default withRouter(connect(msp, mdp)(LikesList));