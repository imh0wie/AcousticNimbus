import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { fetchSongs } from "../../../actions/song_actions";
import { fetchFollows } from "../../../actions/follow_actions";
import { fetchUsers } from "../../../actions/user_actions";
import { followersOf } from "../../../util/follow_api_util";
import { suggestedArtists } from "../../../util/user_api_util";
import ArtistsListItem from "./artist_list_item";
import { songsOf } from "../../../util/song_api_util";

const msp = (state) => {
    debugger
    return ({
        suggestedArtists: suggestedArtists(3, state.entities.follows, state.entities.users, state.entities.users[state.session.id]),
        songs: state.entities.songs,
        follows: state.entities.follows,
    });
}

const mdp = (dispatch) => {
    return ({
        fetchSongs: () => dispatch(fetchSongs()),
        fetchFollows: () => dispatch(fetchFollows()),
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
        if (!this.props.suggestedArtists) {
            return (
                <img src={window.loading5}></img>
            );
        } else if (this.props.suggestedArtists.length === 0) {
            return (
                <div className="error-message">
                    <h4>We cannot recommend you any users because:</h4>
                    <p>1) you have followed all users on Acoustic Nimbus; OR</p>
                    <p>2) our site sucks and you are the only user...</p>
                </div>
            );
        } else {
            return (
                <ul>
                    <p> : )</p>
                    {this.props.suggestedArtists.map((artist) => {
                        return (
                            <ArtistsListItem 
                                artist={artist}
                                artistFollowers={followersOf(artist.id, this.props.follows)}
                                artistSongs={songsOf(artist, this.props.songs)}
                            />
                        );
                    })}
                </ul>
            )
        }
    }
}

export default withRouter(connect(msp, mdp)(ArtistsList));