import React from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { createFollow, removeFollow } from "../../../actions/follow_actions";
import { followersOf, followOf } from "../../../util/follow_api_util";
import { songsOf } from "../../../util/song_api_util";

const msp = (state, ownProps) => {
    const artistId = ownProps.artist.id;
    // const follows = state.entities.follows;
    const currentUserId = state.session.id;
    return ({
        artistFollow: followOf(artistId, currentUserId, state.entities.follows),
        // artistFollowers: followersOf(artistId, follows, state.entities.users),
        // artistSongs: songsOf(artistId, state.entities.songs),
        currentUserId: currentUserId,
    })
}

const mdp = (dispatch) => {
    return ({
        createFollow: (follow) => dispatch(createFollow(follow)),
        removeFollow: (follow) => dispatch(removeFollow(follow)),
    });
}

class ArtistListItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            followed: false,
        }
        this.handleFollow = this.handleFollow.bind(this);
    }

    handleFollow(e) {
        e.preventDefault();
        if (this.state.followed) {
            this.props.removeFollow(this.props.artistFollow).then(
                this.setState({
                    followed: !this.state.followed,
                })
            );
        } else {
            const follow = {
                followed_user_id: this.props.artist.id,
                follower_id: this.props.currentUserId,
            }
            this.props.createFollow(follow).then(
                this.setState({
                    followed: !this.state.followed,
                })
            );
        }
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
        // if (!this.props.artistSongs) return null;
        return (
            <li>
                <div className="item-info-container">
                    <img src={this.props.artist.imageURL ? this.props.artist.imageURL : window.user_dp} className="item-img"></img>
                    <div className="item-info">
                        <Link to={`/users/${this.props.artist.id}`}>{this.props.artist.username}</Link>
                        <div className="social">
                            <p><i className="fas fa-user-friends"></i> {this.renderNumber(this.props.artist.followersCount)}</p>
                            <p><i className="fas fa-music"></i> {this.renderNumber(this.props.artist.songsCount)}</p>
                            {/* <p><i className="fas fa-user-friends"></i> {this.renderNumber(this.props.artistFollowers.length)}</p> */}
                            {/* <p><i className="fas fa-music"></i> {this.renderNumber(this.props.artistSongs.length)}</p> */}
                        </div>
                    </div>
                </div>
                {/* <button onClick={(e) => this.handleFollow(e)}>{this.props.artistFollow ? "Following" : "Follow"}</button> */}
                <button className={this.state.followed ? "following" : ""} onClick={(e) => this.handleFollow(e)}>{this.state.followed ? "Following" : "Follow"}</button>
            </li>
        );
    }
}

export default withRouter(connect(msp, mdp)(ArtistListItem));