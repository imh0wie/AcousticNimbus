import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { fetchSongs } from "../../../actions/song_actions";
import { fetchFollows } from "../../../actions/follow_actions";
import { fetchUsers, fetchThreeRandomUsers } from "../../../actions/user_actions";
import { suggestedArtists } from "../../../util/user_api_util";
import ArtistsListItem from "./artists_list_item";

const msp = (state) => {
    const follows = state.entities.follows;
    const users = state.entities.users;
    const currentUserId = state.session.id;
    return ({
        songs: state.entities.songs,
        follows: follows,
        users: users,
        randomThree: suggestedArtists(users.randomThree),
        currentUserId: currentUserId,
    });
}

const mdp = (dispatch) => {
    return ({
        fetchSongs: () => dispatch(fetchSongs()),
        fetchFollows: () => dispatch(fetchFollows()),
        fetchThreeRandomUsers: (currentUserId) => dispatch(fetchThreeRandomUsers(currentUserId)),
        fetchUsers: () => dispatch(fetchUsers()),
    });
}

class ArtistsList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
        }
    }

    componentDidMount() {
        this.props.fetchThreeRandomUsers(this.props.currentUserId);
        this.setState({
            loading: false,
        })
    }

    render() {
        if (this.state.loading || !this.props.randomThree) {
            return (
                <img src={window.loadingPizza} className="loading"></img>
            );
        } else {
            if (this.props.randomThree.length === 0) {
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
                        {this.props.randomThree.map((artist) => {
                            return (
                                <ArtistsListItem 
                                    key={artist.id}
                                    artist={artist} 
                                />
                            );
                        })}
                    </ul>
                )
            }
        }
    } 
}

export default withRouter(connect(msp, mdp)(ArtistsList));