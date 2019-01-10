import React from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { fetchFollowedAndLikedSongsOf, emptyFollowedSongs } from "../../../actions/song_actions";
import { createFollow, removeFollow } from "../../../actions/follow_actions";

const msp = (state) => {
    const follows = state.entities.follows;
    const currentUserId = state.session.id;
    return ({
        songs: state.entities.songs,
        currentFollowings: follows ? Object.values(follows.interests) : null,
        // currentFollowers: follows ? Object.values(follows.attentions) : null,
        currentUserId: currentUserId,
    })
}

const mdp = (dispatch) => {
    return ({
        createFollow: (follow) => dispatch(createFollow(follow)),
        removeFollow: (follow) => dispatch(removeFollow(follow)),
        fetchFollowedAndLikedSongsOf: (userId) => dispatch(fetchFollowedAndLikedSongsOf(userId)),
        emptyFollowedSongs: (defaultState) => dispatch(emptyFollowedSongs(defaultState)),
    });
}

class ArtistListItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            artistFollow: false,
        }
        this.handleFollow = this.handleFollow.bind(this);
    }

    handleFollow(e) {
        e.preventDefault();
        const follow = {
            followed_user_id: this.props.artist.id,
            follower_id: this.props.currentUserId,
        };
        const defaultState = {
            followedSongs: null,
            likedSongs: this.props.songs.likedSongs,
            songsOfSpecificUser: this.props.songs.songsOfSpecificUser ? this.props.songs.songsOfSpecificUser : null,
            likedSongsOfSpecificUser: this.props.songs ? this.props.songs.likedSongsOfSpecificUser : null,
            individualSong: this.props.songs ? this.props.songs.individualSong : null,
            relatedSongsByGenre: this.props.songs ? this.props.songs.relatedSongsByGenre : null,
        };
        this.props.createFollow(follow);
        this.props.emptyFollowedSongs(defaultState);
    }

    renderNumber(data) {
        if (data < 1000) {
            return data;
        } else if (data < 10000) {
            const thousand = data.toString().slice(0,1);
            const lastThreeDigits = data.toString().slice(1);
            return `${thousand},${lastThreeDigits}`;
        } else {
            const integerDigits = Math.floor(data / 1000);
            const decimalDigit = (data % 1000).toString().slice(0, 1);
            return `${integerDigits}.${decimalDigit} k`;
        }
    }

    render() {
        return (
            <li>
                <div className="item-info-container">
                    <img src={this.props.artist.imageURL ? this.props.artist.imageURL : window.user_dp} className="item-img"></img>
                    <div className="item-info">
                        <Link to={`/users/${this.props.artist.id}`}>{this.props.artist.username}</Link>
                        <div className="social">
                            <p><i className="fas fa-user-friends"></i> {this.renderNumber(this.props.artist.followersCount)}</p>
                            <p><i className="fas fa-music"></i> {this.renderNumber(this.props.artist.songsCount)}</p>
                        </div>
                    </div>
                </div>
                <button className={this.state.artistFollow ? "following" : ""} onClick={(e) => this.handleFollow(e)}>{this.state.artistFollow ? "Following" : "Follow"}</button>
            </li>
        );
    }
}

export default withRouter(connect(msp, mdp)(ArtistListItem));