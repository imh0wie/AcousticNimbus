import React from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { fetchLikes } from "../../../actions/like_actions";
import { likesBy, likesOf } from "../../../util/like_api_util";
import MiniList from "../mini_list/mini_list";

const msp = (state, ownProps) => {
    const song = ownProps.song;
    const songId = ownProps.songId;
    const currentUserId = state.session.id;
    const likes = state.entities.likes;
    return ({
        song: song,
        songId: songId,
        likes: likes,
        currentLikes: likesBy(likes, currentUserId),
        songLikes: likesOf("Song", songId, likes),
    });
}

const mdp = (dispatch) => {
    return ({
        fetchLikes: () => dispatch(fetchLikes()),
    })
}

class LikesSession extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
        }
    }

    componentDidMount() {
        this.props.fetchLikes();
        this.setState({
            loading: false,
        })
    }

    renderList() {
        if (this.state.loading) {
            return <img src={window.loading5}></img>;
        } else {
            switch (this.props.klass) {
                case "homepage":
                    return (
                        <MiniList
                            klass="likes-section"
                            currentLikes={this.props.currentLikes}
                        />
                    );
                case "song-show-page":
                    return (
                        <div id="likes-section">
                            hi
                        </div>
                    );
                default:
                    break;
            }
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
            default:
                break;
        }
        debugger
        return (
            <div className="likes-section">
                <div className="header">
                    <p><i className="fas fa-heart"></i> {this.likes ? this.likes.length : "0"} likes</p>
                    <Link to="" onClick={(e) => e.preventDefault()}>View all</Link>
                </div>
                {this.renderList()}
            </div>
        );
    } 
}

export default withRouter(connect(msp, mdp)(LikesSession));