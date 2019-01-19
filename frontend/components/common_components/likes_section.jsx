import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { fetchLikedSongs, emptyLikedSongs } from "../../actions/song_actions";
import { randomize } from "../../util/general_api_util";
import MiniList from "./mini_list/mini_list";
import BubblesList from "./bubbles_list/bubbles_list"

const msp = (state) => {
    const users = state.entities.users;
    const currentUserId = state.session.id;
    return ({
        songs: state.entities.songs,
        likes: state.entities.likes,
        currentUserId: currentUserId,
        currentUser: users[currentUserId],
    });
}

const mdp = (dispatch) => {
    return ({
        fetchLikedSongs: (data) => dispatch(fetchLikedSongs(data)),
        emptyLikedSongs: (defaultState) => dispatch(emptyLikedSongs(defaultState)),
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
                    loading: true,
                }
                break;
            case "song-show-page":
                this.state = {
                    likers: Object.values(this.props.song.likers),
                    liked: this.props.song.likes[this.props.currentUserId] ? true : false,
                    loading: true,
                }
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
                this.data = {
                    current_user_id: this.props.currentUserId,
                    fetching_liked_songs: true,
                }
                this.props.fetchLikedSongs(this.data);
                break;
            case "user-show-page":
                this.setState({
                    loading: false,
                })
                break;
            case "song-show-page":
                this.setState({
                    loading: false,
                })
                break;
            default:
                break;

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
                    this.data = {
                        current_user_id: this.props.currentUserId,
                        fetching_liked_songs: true,
                    }
                    this.props.fetchLikedSongs(this.data);
                } else if ((!this.props.likes && nextProps.likes) || (this.props.likes && nextProps.likes && Object.keys(this.props.likes).length !== Object.keys(nextProps.likes).length)) {
                    const defaultState = {
                        likedSongs: null,
                    };
                    this.props.emptyLikedSongs(defaultState);
                    this.setState({
                        loading: true,
                    });
                }
                break;
            case "user-show-page":
                break;
            case "song-show-page":
                if ((!this.props.likes && nextProps.likes) || (this.props.likes && nextProps.likes && Object.keys(this.props.likes).length !== Object.keys(nextProps.likes).length)) {
                    if (this.state.liked) {
                        const idx = this.state.likers.findIndex(liker => liker.id === this.props.currentUserId);
                        this.setState({
                            likers: this.state.likers.length === 1 ? [] : this.state.likers.slice(0, idx).concat(this.state.liker.slice(idx + 1)),
                            liked: !this.state.liked,
                        });
                    } else {
                        this.setState({
                            likers: this.state.likers.concat([this.props.currentUser]),
                            liked: !this.state.liked,
                        });
                    }
                }

                break;
            default:
                break;
        }
    }

    render() {
        switch (this.props.klass) {
            case "homepage":
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
                </div>
                {this.renderList()}
            </div>
        );
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