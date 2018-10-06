import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { fetchSongs } from "../../../actions/song_actions";
import { latestTwelve } from "../../../util/song_api_util";

const msp = (state) => {
    debugger;
    return {
      songs: latestTwelve(state.entities.songs),
      currentUser: state.entities.users[state.session.id],
    };
};

const mdp = (dispatch) => {
    debugger
    return ({
        fetchSongs: () => dispatch(fetchSongs()),
    });
};

class SongsGrids extends React.Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        debugger
        this.props.fetchSongs();
    }

    render() {
        return (
            <div className="splash-page-content">
                {this.props.songs.map((song) => {
                    <SongGrid
                    key={song.id}
                    song={song}
                   />
                })}
            </div>
        );
    }
}

export default withRouter(connect(msp, mdp)(SongsGrids));