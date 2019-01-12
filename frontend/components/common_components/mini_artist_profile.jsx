import React from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { createFollow, removeFollow } from "../../actions/follow_actions";
import { fetchUsers } from "../../actions/user_actions";


const msp = (state, ownProps) => {
    const songs = state.entities.songs;
    const follows = state.entities.follows;
    const users = state.entities.users;
    const song = songs ? songs[parseInt(ownProps.match.params.songId)] : null;
    const currentUserId = state.session.id;
    return ({
        songs: songs,
        follows: follows,
        users: users,
        song: song,
        currentUserId: currentUserId,
    });
}

const mdp = (dispatch) => {
    return({
        createFollow: (follow) => dispatch(createFollow(follow)),
        removeFollow: (id) => dispatch(removeFollow(id)),
        fetchUsers: () => dispatch(fetchUsers()),
    })
}

class MiniArtistProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentFollow: this.props.follows ? 
                            Object.values(this.props.follows.interests).find(follow => follow.followedUserId === this.props.songArtist.id) : 
                            Object.values(this.props.songArtist.attentions).find(follow => follow.followerId === this.props.currentUserId),
            followersCount: this.props.songArtist.followersCount,
        }
        this.noneStyle = {
            display: "none",
        };
    }

    componentWillReceiveProps(nextProps) {
        if ((!this.props.follows && nextProps.follows && nextProps.follows.interests) || (this.props.follows && Object.keys(this.props.follows.interests).length !== Object.keys(nextProps.follows.interests).length)) {
            this.setState({
                currentFollow: Object.values(nextProps.follows.interests).find(follow => follow.followedUserId === this.props.songArtist.id),
            })
        }
    }

    handleFollow(e) {
        e.preventDefault();
        if (this.state.currentFollow) {
            this.props.removeFollow(this.state.currentFollow).then(this.setState({
                currentFollow: null,
                followersCount: this.state.followersCount - 1,
            }));
        } else {
            const follow = {
                followed_user_id: this.props.songArtist.id,
                follower_id: this.props.currentUserId,
            }
            this.props.createFollow(follow).then(this.setState({
                followersCount: this.state.followersCount + 1,
            }));
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
        // if (!this.props.songs || !this.props.follows || !this.props.users) return <img src={window.loadingPizza} className="loading"></img>;
        return (
            <div className="artist-info-container">
                <img src={this.props.songArtist.imageURL ? this.props.songArtist.imageURL : window.user_dp} className="artist-img"></img>
                <Link to={`/users/${this.props.songArtist.id}`}>{this.props.songArtist.username}</Link>
                <div className="follows-songs">
                    <Link to=""><i className="fas fa-user-friends"></i> {this.renderNumber(this.state.followersCount)}</Link>
                    <Link to=""><i className="fas fa-music"></i> {this.props.songArtist.songsCount}</Link>
                </div>
                <button className={this.state.currentFollow ? "following" : "follow"}
                        onClick={(e) => this.handleFollow(e)}
                        style={this.props.songArtist.id === this.props.currentUserId ? this.noneStyle : {}}>
                {this.state.currentFollow ? "Following" : "Follow"}
                </button>
            </div>
        );
    }
}

export default withRouter(connect(msp, mdp)(MiniArtistProfile));