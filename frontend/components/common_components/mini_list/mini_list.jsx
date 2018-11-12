import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { fetchSongs } from "../../../actions/song_actions";
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
        fetchSongs: () => dispatch(fetchSongs()),
        fetchLikes: () => dispatch(fetchLikes()),
        fetchComments: () => dispatch(fetchComments()),
    });
}

class MiniList extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        if (this.props.klass === "likes-section") {
            this.props.fetchSongs().then(
                this.props.fetchComments()
            );
        } else {
            this.props.fetchComments();
        }
        
    }

    render() {
        if (isEmpty(this.props.comments)) return <img src={window.loading5} className="loading"></img>;
        switch (this.props.klass) {
            case "likes-section":
                // if (!this.props.latestThreeLikes || this.props.latestThreeLikes.length === 0) return <p className="ui-message">You haven't liked any songs yet! Find your jam!</p>;
                this.miniListItems = this.props.latestThreeLikes;
                break;
            case "song-show-page":
                // if (!this.props.relatedThreeSongs || this.props.relatedThreeSongs.length === 0) return <p className="ui-message">No love...:(</p>;
                this.miniListItems = this.props.relatedThreeSongs;
                break;
            default:
                break;
        }
        if (!isEmpty(this.props.songs) && this.miniListItems) {
            return (
                <ul>
                    {this.miniListItems.map((item) => {
                        return (
                            <MiniListItem
                            key={item.id}
                            item={item}
                            song={this.props.klass === "likes-section" ? this.props.songs[item.likeableId] : item}
                            songLikes={this.props.klass === "likes-section" ? likesOf("Song", item.likeableId, this.props.likes) : likesOf("Song", item.id, this.props.likes)}
                            songComments={this.props.klass === "likes-section" ? commentsOf(item.likeableId, this.props.comments) : commentsOf(item.id, this.props.comments)}
                            />
                        );
                    })}
                </ul>
            );    
        } else {
            // if (this.props.klass === "likes-section") return null;
            return <img src={window.loading5} className="loading"></img>;
        }

    }
}

export default withRouter(connect(msp, mdp)(MiniList));