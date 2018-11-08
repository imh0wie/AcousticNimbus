import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { fetchSongs } from "../../../actions/song_actions";
import { fetchFollows, createFollow, removeFollow } from "../../../actions/follow_actions";
import { fetchUsers } from "../../../actions/user_actions";
import { followersOf, followOf } from "../../../util/follow_api_util";
import { suggestedArtists } from "../../../util/user_api_util";
import ArtistsListItem from "./artists_list_item";
import { songsOf } from "../../../util/song_api_util";

const msp = (state) => {
    debugger
    return ({
        suggestedArtists: suggestedArtists(3, state.entities.follows, state.entities.users, state.session.id),
        songs: state.entities.songs,
        follows: state.entities.follows,
        users: state.entities.users,
        currentUser: state.entities.users[state.session.id],
    });
}

const mdp = (dispatch) => {
    return ({
        fetchSongs: () => dispatch(fetchSongs()),
        fetchFollows: () => dispatch(fetchFollows()),
        createFollow: (follow) => dispatch(createFollow(follow)),
        removeFollow: (id) => dispatch(removeFollow(id)),
        fetchUsers: () => dispatch(fetchUsers()),
    });
}

class ArtistsList extends React.Component {
    constructor(props) {
        super(props);
        debugger
    }

    componentDidMount() {
        debugger
        this.props.fetchSongs();
        this.props.fetchFollows();
        this.props.fetchUsers();
    }

    render() {
        debugger
        if (!this.props.suggestedArtists) {
            debugger
            return (
                <img src={window.loading5} className="loading"></img>
            );
        } else if (this.props.suggestedArtists.length === 0) {
            debugger
            return (
                <div className="error-message">
                    <h4>We cannot recommend you any users because:</h4>
                    <p>1) you have followed all users on Acoustic Nimbus; OR</p>
                    <p>2) our site sucks and you are the only user...</p>
                </div>
            );
        } else {
            debugger
            return (
                <ul>
                    {this.props.suggestedArtists.map((artist) => {
                        return (
                            <ArtistsListItem 
                                artist={artist} 
                                artistFollow={followOf(artist.id, this.props.currentUser.id, this.props.follows)}
                                artistFollowers={followersOf(artist.id, this.props.follows, this.props.users)}
                                artistSongs={songsOf(artist, this.props.songs)}
                                createFollow={this.props.createFollow}
                                removeFollow={this.props.removeFollow}
                                currentUser={this.props.currentUser}
                            />
                        );
                    })}
                </ul>
            )
        }
    } 
}

export default withRouter(connect(msp, mdp)(ArtistsList));