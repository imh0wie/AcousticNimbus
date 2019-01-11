import React from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { fetchLikes } from "../../actions/like_actions";
import { fetchLikedSongs, emptyLikedSongs, fetchLikedSongsOfSpecificUser, emptyLikedSongsOfSpecificUser } from "../../actions/song_actions";
import { fetchLikersOfSpecificSong, emptyLikersOfSpecificSong } from "../../actions/user_actions";
import { likesBy, likesOf } from "../../util/like_api_util";
import { likedSongsJsonToArr } from "../../util/song_api_util";
import { randomize } from "../../util/general_api_util";
import MiniList from "./mini_list/mini_list";
import BubblesList from "./bubbles_list/bubbles_list"

const msp = (state, ownProps) => {
    const songs = state.entities.songs;
    const users = state.entities.users;
    const songId = ownProps.songId ? ownProps.songId : parseInt(ownProps.match.params.songId);
    const song = songs ? songs[songId] : null;
    const userId = ownProps.match.params.userId ? parseInt(ownProps.match.params.userId) : null;
    const currentUserId = state.session.id;
    const likes = state.entities.likes;
    return ({
        // song: song,
        songId: songId,
        songs: songs,
        likes: likes,
        users: users,
        songLikes: likesOf("Song", songId, likes), // song's likes => users
        userLikes: likesBy(likes, userId), // user's likes =>
        currentUserId: currentUserId,
        currentUser: users[currentUserId],
    });
}

const mdp = (dispatch) => {
    return ({
        fetchLikes: () => dispatch(fetchLikes()),
        fetchLikedSongs: (userId) => dispatch(fetchLikedSongs(userId)),
        emptyLikedSongs: (defaultState) => dispatch(emptyLikedSongs(defaultState)),
        fetchLikedSongsOfSpecificUser: (userId, fetchingLikes) => dispatch(fetchLikedSongsOfSpecificUser(userId, fetchingLikes)),
        emptyLikedSongsOfSpecificUser: (defaultState) => dispatch(emptyLikedSongsOfSpecificUser(defaultState)),
        fetchLikersOfSpecificSong: (songId) => dispatch(fetchLikersOfSpecificSong(songId)),
        emptyLikersOfSpecificSong: (defaultState) => dispatch(emptyLikersOfSpecificSong(defaultState)),
    })
}

class LikesSection extends React.Component {
    constructor(props) {
        super(props);
        switch (this.props.klass) {
            case "homepage":
                this.state = {
                    likedSongs: this.props.songs && this.props.songs.likedSongs ? Object.values(this.props.songs.likedSongs) : null,
                    loading: true,
                }
                break;
            case "user-show-page":
                this.state = {
                    likedSongsOfSpecificUser: this.props.onPageArtist ? Object.values(this.props.onPageArtist.likedSongs) : null,
                    // likedSongsOfSpecificUser: this.props.songs && this.props.songs.likedSongsOfSpecificUser ? Object.values(this.props.songs.likedSongsOfSpecificUser) : null,
                    loading: true,
                }
                break;
            case "song-show-page":
                debugger
                this.state = {
                    likers: Object.values(this.props.song.likers),
                    liked: this.props.song.likes[this.props.currentUserId] ? true : false,
                    loading: true,
                    // counter: 0,
                }
                // this.state = {
                //     likers: this.props.users && this.props.users.likersOfSpecificSong ? Object.values(this.props.users.likersOfSpecificSong) : null,
                //     loading: true,
                //     counter: 0,
                // }
                break;
            default:
                break;
        }
        this.customStyle = {
            minHeight: "75px"
        };
    }

    componentDidMount() {  
        switch (this.props.klass) {
            case "homepage":
                break;
            case "user-show-page":
                this.setState({
                    loading: false,
                })
                // this.defaultState = {
                //     followedSongs: this.props.songs ? this.props.songs.followedSongs : null,
                //     likedSongs: this.props.songs ? this.props.songs.likedSongs : null,
                //     songsOfSpecificUser: this.props.songs ? this.props.songs.songsOfSpecificUser : null,
                //     likedSongsOfSpecificUser: null,
                //     individualSong: this.props.songs ? this.props.songs.individualSong : null,
                //     relatedSongsByGenre: this.props.songs ? this.props.songs.relatedSongsByGenre : null,
                // };
                // this.props.emptyLikedSongsOfSpecificUser(this.defaultState);
                break;
            case "song-show-page":
                this.setState({
                    loading: false,
                })
                // this.defaultState = {
                //     randomThree: this.props.users && this.props.users.randomThree ? this.props.users.randomThree : null,
                //     [this.props.currentUserId]: this.props.currentUser,
                //     individualUser: this.props.users && this.props.users.individualUser ? this.props.users.individualUser : null,
                //     followersOfSpecificUser: this.props.users && this.props.users.followersOfSpecificUser ? this.props.users.followersOfSpecificUser : null,
                //     likersOfSpecificSong: null,
                // };
                // this.props.emptyLikersOfSpecificSong(this.defaultState);
                break;
            default:
                break;
        // if (this.props.klass !== "song-show-page" && !this.props.songs) {
        //     this.props.fetchRelevantSongs(this.props.currentUserId).then(() => {
        //         this.setState({
        //             loading: false,
        //             likedSongs: this.props.songs ? Object.values(this.props.songs.likedSongs) : null,
        //         })
        //     });
        // }
        }
    }

    componentWillReceiveProps(nextProps) {
        switch (this.props.klass) {
            case "homepage":
                if ((!this.props.songs || !this.props.songs.likedSongs) && nextProps.songs && nextProps.songs.likedSongs) {
                    this.setState({
                        loading: false,
                        likedSongs: Object.values(nextProps.songs.likedSongs),
                    });
                } 
                if (this.props.songs && Object.keys(this.props.songs).includes("likedSongs") && this.props.songs.likedSongs === null && nextProps.songs.likedSongs) {
                    this.setState({
                        loading: false,
                        likedSongs: Object.values(nextProps.songs.likedSongs),
                    });
                } else if (this.props.songs && Object.keys(nextProps.songs).includes("likedSongs") && nextProps.songs.likedSongs === null) {
                    this.props.fetchLikedSongs(this.props.currentUserId);
                } else if ((!this.props.likes && nextProps.likes) || (this.props.likes && nextProps.likes && Object.keys(this.props.likes).length !== Object.keys(nextProps.likes).length)) {
                    const defaultState = {
                        followedSongs: this.props.songs ? this.props.songs.followedSongs : null,
                        likedSongs: null,
                        songsOfSpecificUser: this.props.songs ? this.props.songs.songsOfSpecificUser : null,
                        likedSongsOfSpecificUser: this.props.songs ? this.props.songs.likedSongsOfSpecificUser : null,
                        individualSong: this.props.songs ? this.props.songs.individualSong : null,
                        relatedSongsByGenre: this.props.songs ? this.props.songs.relatedSongsByGenre : null,
                    };
                    this.props.emptyLikedSongs(defaultState);
                    this.setState({
                        loading: true,
                    });
                }
            // if ((!this.props.likes && nextProps.likes) || (this.props.likes && nextProps.likes && Object.keys(this.props.likes).length !== Object.keys(nextProps.likes).length)) {
                //     const defaultState = {
                    //         followedSongs: this.props.songs ? this.props.songs.followedSongs : null,
                    //         likedSongs: null,
                    //         songsOfSpecificUser: this.props.songs ? this.props.songs.songsOfSpecificUser : null,
                    //     };
                    //     this.props.emptyLikedSongs(defaultState);
                    //     this.props.fetchLikedSongs(this.props.currentUserId).then(this.setState({
                        //         likedSongs: Object.values(nextProps.songs.likedSongs),
                        //     }));
                        // }
                break;
            case "user-show-page":
                // debugger
                // if (this.props.songs && !this.props.songs.likedSongsOfSpecificUser && nextProps.songs && nextProps.songs.likedSongsOfSpecificUser) {
                //     debugger
                //     this.setState({
                //         loading: false,
                //         likedSongsOfSpecificUser: Object.values(nextProps.songs.likedSongsOfSpecificUser),
                //     });
                // } else if (this.state.loading) { // && Object.keys(nextProps.songs).includes("likedSongsOfSpecificUser") && nextProps.songs.likedSongsOfSpecificUser === null) {
                //     debugger
                //     this.props.fetchLikedSongsOfSpecificUser(this.props.onPageArtistId, true);
                //     // this.setState({
                //     //     loading: false,
                //     // });
                // } else {
                // }
                break;
            case "song-show-page":
                if ((!this.props.likes && nextProps.likes) || (this.props.likes && nextProps.likes && Object.keys(this.props.likes).length !== Object.keys(nextProps.likes).length)) {
                    debugger
                    if (this.state.liked) {
                        debugger
                        const idx = this.state.likers.findIndex(liker => liker.id === this.props.currentUserId);
                        this.setState({
                            likers: this.state.likers.length === 1 ? [] : this.state.likers.slice(0, idx).concat(this.state.liker.slice(idx + 1)),
                            liked: !this.state.liked,
                        });
                    } else {
                        debugger
                        this.setState({
                            likers: this.state.likers.concat([this.props.currentUser]),
                            liked: !this.state.liked,
                        });
                    }
                }
                // if ((!this.props.users.likersOfSpecificSong && nextProps.users.likersOfSpecificSong) || (this.props.users.likersOfSpecificSong && nextProps.users.likersOfSpecificSong && Object.keys(this.props.users.likersOfSpecificSong).length !== Object.keys(nextProps.users.likersOfSpecificSong).length)) {
                //     this.setState({
                //         loading: false,
                //         likers: Object.values(nextProps.users.likersOfSpecificSong),
                //     });
                // } else if (this.state.loading && this.state.counter === 0) { // && Object.keys(nextProps.songs).includes("likedSongsOfSpecificUser") && nextProps.songs.likedSongsOfSpecificUser === null) {
                //     this.props.fetchLikersOfSpecificSong(this.props.songId);
                //     this.setState({
                //         counter: this.state.counter + 1,
                //     });
                // }
                break;
            default:
                break;
        }
    }

    // componentWillReceiveProps(nextProps) {
    //     if (this.props.klass !== "song-show-page") {
    //         if (((!this.props.songs || !this.props.songs.likedSongs) && nextProps.songs && nextProps.songs.likedSongs)) {
    //             this.setState({
    //                 loading: false,
    //                 likedSongs: Object.values(nextProps.songs.likedSongs),
    //             });
    //         }
    //         if ((!this.props.likes && this.props.likes !== nextProps.likes) || (this.props.likes && Object.keys(this.props.likes).length !== Object.keys(nextProps.likes).length)) {
    //             const defaultState = {
    //                 followedSongs: this.props.songs.followedSongs,
    //                 likedSongs: null,
    //                 songsOfSpecificUser: this.props.songs.songsOfSpecficUser ? this.props.songs.songsOfSpecficUser : null,
    //             };
    //             this.props.emptyLikedSongs(defaultState);
    //             this.props.fetchLikedSongs(this.props.currentUserId);
    //             this.setState({
    //                 likedSongs: Object.values(nextProps.songs.likedSongs),
    //             });
    //         // this.setState({
    //             //     likedSongs: Object.values(nextProps.songs.likedSongs),
    //             // });
    //         }
    //         // if (nextProps.songs && !nextProps.songs.likedSongs) {
    //         //     this.props.fetchLikedSongs(this.props.currentUserId);
    //         //     this.setState({
    //         //         likedSongs: Object.values(nextProps.songs.likedSongs),
    //         //     });
    //         // }
    //         // if (!this.props.songs && !nextProps.songs) {
    //         //     return;
    //         // } else if (!this.props.songs || this.props.songs.likedSongs.length !== nextProps.songs.likedSongs.length) {
    //         //     this.setState({
    //         //         loading: false,
    //         //         likedSongs: Object.values(nextProps.songs.likedSongs),
    //         //     });
    //         // }
    //         // if (!this.likes) {

    //         // }
    //         // if (!this.props.likes && !nextProps.likes) {
    //         //     return;
    //         // } else if (!this.props.likes || this.props.likes.likedSongs.length !== nextProps.likes.likedSongs.length) {
    //         //     this.setState({
    //         //         loading: false,
    //         //         likedSongs: Object.values(nextProps.likes.likedSongs),
    //         //     });
    //         // }
    //     }
    // }

    render() {
        switch (this.props.klass) {
            case "homepage":
            // case "user-show-page":
                this.likes = this.state.likedSongs;
                break;
            case "user-show-page":
                this.likes = this.state.likedSongsOfSpecificUser;
                break;
            case "song-show-page":
                this.likes = this.state.likers;
                break;
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
            return <img src={window.loadingPizza} className="loading-sm"></img>;
        } else {
            switch (this.props.klass) {
                case "homepage":
                case "user-show-page":
                    return (
                        <MiniList klass="likes-section" likedSongs={randomize(this.likes)} />
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
}

export default withRouter(connect(msp, mdp)(LikesSection));