import React from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { fetchLikes } from "../../actions/like_actions";
import { likesBy, likesOf } from "../../util/like_api_util";
import MiniList from "./mini_list/mini_list";
import BubblesList from "./bubbles_list/bubbles_list"

const msp = (state, ownProps) => {
    const song = ownProps.song;
    const songId = ownProps.songId;
    const userId = parseInt(ownProps.match.params.userId);
    const currentUserId = state.session.id;
    const likes = state.entities.likes;
    return ({
        song: song,
        songId: songId,
        likes: likes,
        currentLikes: likesBy(likes, currentUserId),
        songLikes: likesOf("Song", songId, likes),
        userLikes: likesBy(likes, userId)
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
        this.minHeight = {
            // minHeight: "275px",
            display: "none"
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
            return <img src={window.loading5}></img>;
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
            // case "user-show-page":
            //     return (
            //         <MiniList klass="likes-section" currentLikes={this.likes} />
            //     );
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
        return (
            <div className="likes-section" style={this.state.loading ? this.minHeight : {}}>
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