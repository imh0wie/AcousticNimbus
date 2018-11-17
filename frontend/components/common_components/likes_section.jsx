import React from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { fetchLikes } from "../../actions/like_actions";
import { likesBy, likesOf } from "../../util/like_api_util";
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
        likes: likes,
        currentLikes: likesBy(likes, currentUserId), // current user's liked songs => songs
        songLikes: likesOf("Song", songId, likes), // song's likes => users
        userLikes: likesBy(likes, userId) // user's likes =>
    });
}

const mdp = (dispatch) => {
    return ({
        fetchLikes: () => dispatch(fetchLikes()),
    })
}

class LikesSection extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
        }
        this.marginBottom = {
            marginBottom: "30px"
        };
    }

    componentDidMount() {
        if (this.props.klass !== "song-show-page") this.props.fetchLikes();
        this.setState({
            loading: false,
        })
    }

    renderList() {
        if (this.state.loading) {
            return <img src={window.loadingPizza} className="loading-sm"></img>;
        }
        switch (this.props.klass) {
            case "homepage":
            case "user-show-page":
                return (
                    <MiniList klass="likes-section" currentLikes={this.likes} />
                );
            case "song-show-page":
                return (
                    <BubblesList klass="song-show-page" items={this.likes} />
                    );
            default:
                return null;
        }
    }

    render () {
        switch (this.props.klass) {
            case "homepage":
                this.likes = this.props.currentLikes;
                break;
            case "song-show-page":
                this.likes = this.props.songLikes;
                break;
            case "user-show-page":
                this.likes = this.props.userLikes;
            default:
                break;
        }
        if (!this.likes) return <div className="likes-section" style={this.props.klass === "user-show-page" ? this.marginBottom : {}}></div>;
        return (
            <div className="likes-section" style={this.props.klass === "user-show-page" ? this.marginBottom : {}}>
                <div className="header">
                    <p><i className="fas fa-heart"></i> {this.likes ? this.likes.length : "0"} likes</p>
                    <Link to="" onClick={(e) => e.preventDefault()}>View all</Link>
                </div>
                {this.renderList()}
            </div>
        );
    } 
}

export default withRouter(connect(msp, mdp)(LikesSection));