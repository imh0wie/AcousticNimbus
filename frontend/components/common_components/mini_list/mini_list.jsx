import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { fetchLikes } from "../../../actions/like_actions";
import { fetchComments } from "../../../actions/comment_actions";
import { isEmpty } from "../../../util/general_api_util"
import { relatedSongsOf } from "../../../util/song_api_util";
import { likesOf } from "../../../util/like_api_util";
import { commentsOf } from "../../../util/comment_api_util";
import MiniListItem from "./mini_list_item";

const msp = (state, ownProps) => {
    const songId = ownProps.match.params.songId;
    const songs = state.entities.songs;
    const currentLikes = ownProps.currentLikes;
    return ({
        songs: songs,
        likes: state.entities.likes,
        comments: state.entities.comments,
        latestThreeLikes: currentLikes ? currentLikes.slice(0, 3) : null,
        relatedThreeSongs: isEmpty(songs) || !songId ? null : relatedSongsOf(songId, songs).slice(0, 3),
    })
}

const mdp = (dispatch) => {
    return ({
        fetchLikes: () => dispatch(fetchLikes()),
        fetchComments: () => dispatch(fetchComments()),
    });
}

class MiniList extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        switch (this.props.klass) {
            case "likes-section":
                this.miniListItems = this.props.likedSongs.slice(0, 3);
                break;
            case "song-show-page":
                this.miniListItems = this.props.relatedThreeSongs;
                break;
            default:
                break;
        }
        if (this.miniListItems.length === 0) return <p className="ui-msg">This user has not liked any songs yet.</p>
        return (
            <ul>
                {this.miniListItems.map((item) => {
                    return (
                        <MiniListItem
                        key={item.id}
                        song={item}
                        />
                    );
                })}
            </ul>
        );
    }
}

export default withRouter(connect(msp, mdp)(MiniList));