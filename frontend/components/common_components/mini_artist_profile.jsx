import React from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { fetchFollows, createFollow, removeFollow } from "../../actions/follow_actions";
import { fetchUsers } from "../../actions/user_actions";
import { followOf } from "../../util/follow_api_util";

const msp = (state, ownProps) => {
    const follows = state.entities.follows;
    const users = state.entities.users;
    const song = ownProps.song;
    const currentUserId = ownProps.currentUserId;
    return ({
        songArtist: users[song.artistId],
        currentFollow: followOf(song.artistId, currentUserId, follows),
    });
}

const mdp = (dispatch) => {
    return({
        fetchFollows: () => dispatch(fetchFollows()),
        createFollow: (follow) => dispatch(createFollow(follow)),
        removeFollow: (id) => dispatch(removeFollow(id)),
        fetchUsers: () => dispatch(fetchUsers()),
    })
}

class MiniArtistProfile extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.fetchUsers().then(this.props.fetchFollows());
    }

    handleFollow(e) {
        e.preventDefault();
        if (this.props.currentFollow) {
          this.props.removeFollow(this.props.currentFollow.id);
        } else {
          const follow = {
            followed_user_id: this.props.songArtist.id,
            follower_id: this.props.currentUserId,
          }
          debugger
          this.props.createFollow(follow);
        }
      }

    render() {
        debugger
        if (this.props.songArtist) {
            debugger
            return (
                <div className="artist-info-container">
                    <img src={this.props.songArtist.imageURL ? this.props.songArtist.imageURL : window.user_dp} className="artist-img"></img>
                    <Link to={`/users/${this.props.song.artistId}`}>{this.props.song.artist}</Link>
                    <div className="follows-songs">
                        <p></p>
                    </div>
                    <button className={this.props.currentFollow ? "following" : "follow"}
                            onClick={(e) => this.handleFollow(e)}
                            style={this.props.song.artistId === this.props.currentUserId ? this.noneStyle : {}}>
                    {this.props.currentFollow ? "Following" : "Follow"}
                    </button>
                </div>
            );
        } else {
            debugger
            return <img src={window.loading5}></img>
        }
        
    }
}

export default withRouter(connect(msp, mdp)(MiniArtistProfile));