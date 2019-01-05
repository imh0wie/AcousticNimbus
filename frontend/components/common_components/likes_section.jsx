import React from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { fetchLikes } from "../../actions/like_actions";
import { fetchRelevantSongs } from "../../actions/song_actions";
import { likesBy, likesOf } from "../../util/like_api_util";
import { likedSongsJsonToArr } from "../../util/song_api_util";
import MiniList from "./mini_list/mini_list";
import BubblesList from "./bubbles_list/bubbles_list"

const msp = (state, ownProps) => {
    const songId = ownProps.songId ? ownProps.songId : parseInt(ownProps.match.params.songId);
    const songs = state.entities.songs;
    const song = songs ? songs[songId] : null;
    const userId = ownProps.match.params.userId ? parseInt(ownProps.match.params.userId) : null;
    const currentUserId = state.session.id;
    const likes = state.entities.likes;
    return ({
        song: song,
        songId: songId,
        songs: songs,
        likes: likes,
        songLikes: likesOf("Song", songId, likes), // song's likes => users
        userLikes: likesBy(likes, userId), // user's likes =>
        currentUserId: currentUserId,
    });
}

const mdp = (dispatch) => {
    return ({
        fetchLikes: () => dispatch(fetchLikes()),
        fetchRelevantSongs: (userId) => dispatch(fetchRelevantSongs(userId)),
    })
}

class LikesSection extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            likedSongs: likedSongsJsonToArr(this.props.songs),
            loading: true,
        }
        this.customStyle = {
            minHeight: "75px"
        };
    }

    // componentDidMount() {
    //     debugger
    //     if (this.props.klass !== "song-show-page" && !this.props.songs) {
    //         debugger
    //         this.props.fetchRelevantSongs(this.props.currentUserId).then(() => {
    //             debugger
    //             this.setState({
    //                 loading: false,
    //                 likedSongs: this.props.songs ? Object.values(this.props.songs.likedSongs) : null,
    //             })
    //         });
    //     }
    // }

    componentWillReceiveProps(nextProps) {
        if (this.props.songs !== "song-show-page") {
            if (!this.props.songs && !nextProps.songs) {
                return;
            } else if (!this.props.songs || this.props.songs.likedSongs.length !== nextProps.songs.likedSongs.length) {
                this.setState({
                    loading: false,
                    likedSongs: Object.values(nextProps.songs.likedSongs),
                });
            }
            // if (!this.props.likes && !nextProps.likes) {
            //     return;
            // } else if (!this.props.likes || this.props.likes.likedSongs.length !== nextProps.likes.likedSongs.length) {
            //     this.setState({
            //         loading: false,
            //         likedSongs: Object.values(nextProps.likes.likedSongs),
            //     });
            // }
        }
    }

    render() {
        switch (this.props.klass) {
            case "homepage":
                this.likes = this.state.likedSongs;
                break;
            case "song-show-page":
                this.likes = this.props.songLikes;
                break;
            case "user-show-page":
                this.likes = this.props.userLikes;
            default:
                break;
        }
        return (
            <div className="likes-section" style={this.props.klass === "user-show-page" ? this.customStyle : {}}>
                <div className="header">
                    <p><i className="fas fa-heart"></i> {this.likes ? this.likes.length : "0"} {this.likes && this.likes.length > 1 ? "likes" : "like"}</p>
                    {/* <Link to="" onClick={(e) => e.preventDefault()}>View all</Link> */}
                </div>
                {this.renderList()}
            </div>
        );
        // }
    }

    renderList() {
        if (this.state.loading || !this.likes) {
            debugger
            return <img src={window.loadingPizza} className="loading-sm"></img>;
        }
        switch (this.props.klass) {
            case "homepage":
            case "user-show-page":
                return (
                    <MiniList klass="likes-section" likedSongs={this.likes} />
                );
            case "song-show-page":
                return (
                    <BubblesList klass="song-show-page" items={this.likes} />
                );
            default:
                return null;
        }
    }
}

export default withRouter(connect(msp, mdp)(LikesSection));