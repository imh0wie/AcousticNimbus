import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { fetchSongs } from "../../../actions/song_actions";
import { fetchFollows } from "../../../actions/follow_actions";
import { fetchUsers } from "../../../actions/user_actions";
import { suggestedArtists } from "../../../util/user_api_util";
import { isEmpty } from "../../../util/general_api_util";
import ArtistsListItem from "./artists_list_item";

const msp = (state) => {
    return ({
        songs: state.entities.songs,
        suggestedArtists: suggestedArtists(3, state.entities.follows, state.entities.users, state.session.id),
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
        this.state = {
            loading: true,
        }
    }

    componentDidMount() {
        if (!this.props.follows) this.props.fetchFollows();
        if (!this.props.users) this.props.fetchUsers();``
        if (!this.props.songs) this.props.fetchSongs();
        // this.props.fetchSongs().then(
        //     this.props.fetchFollows().then(
        //         this.props.fetchUsers()
        //     )
        // );
        this.setState({
            loading: false,
        })
    }

    render() {
        if (this.state.loading) {
            return (
                <img src={window.loading5} className="loading"></img>
            );
        } else {
            if (!this.props.suggestedArtists || this.props.suggestedArtists.length === 0) {
                return (
                    <div className="error-message">
                        <h4>We cannot recommend you any users because:</h4>
                        <p>1) you have followed all users on Acoustic Nimbus; OR</p>
                        <p>2) our site sucks and you are the only user...</p>
                    </div>
                );
            } else {
                if (isEmpty(this.props.songs)) return  <img src={window.loading5} className="loading"></img>;
                return (
                    <ul>
                        {this.props.suggestedArtists.map((artist) => {
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