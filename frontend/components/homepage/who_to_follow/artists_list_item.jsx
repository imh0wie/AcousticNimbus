import React from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { createFollow, removeFollow } from "../../../actions/follow_actions";
import { followersOf, followOf } from "../../../util/follow_api_util";
import { songsOf } from "../../../util/song_api_util";

const msp = (state, ownProps) => {
    const artistId = ownProps.artist.id;
    const follows = state.entities.follows;
    const currentUserId = state.session.id;
    return ({
        currentFollowings: follows ? Object.values(follows.interests) : null,
        currentFollowers: follows ? Object.values(follows.attentions) : null,
        // artistFollow: followOf(artistId, currentUserId, state.entities.follows),
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
            artistFollow: this.props.currentFollowings ? followOf(this.props.artist.id, this.props.currentFollowings) : false,
        }
        this.handleFollow = this.handleFollow.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        // debugger
        if (this.props.currentFollowings !== nextProps.currentFollowings) {
            // debugger
            this.setState({
                artistFollow: followOf(this.props.artist.id, nextProps.currentFollowings)
            });
            // debugger
        }
    }

    handleFollow(e) {
        e.preventDefault();
        // debugger
        if (this.state.artistFollow) {
            // debugger
            this.props.removeFollow(this.state.artistFollow);
            // debugger
        } else {
            const follow = {
                followed_user_id: this.props.artist.id,
                follower_id: this.props.currentUserId,
            }
            // debugger
            this.props.createFollow(follow);
            // debugger
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
                <button className={this.state.artistFollow ? "following" : ""} onClick={(e) => this.handleFollow(e)}>{this.state.artistFollow ? "Following" : "Follow"}</button>
            </li>
        );
    }
}

export default withRouter(connect(msp, mdp)(ArtistListItem));