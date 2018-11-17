import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { fetchSongs } from "../../../actions/song_actions";
import { latest } from "../../../util/song_api_util";
import SongsIndexItem from "./songs_index_item";

const msp = (state) => {
    return {
      latestTwelve: latest(12, state.entities.songs),
    };
};

const mdp = (dispatch) => {
    return ({
        fetchSongs: () => dispatch(fetchSongs()),
    });
};

class SongsIndex extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.fetchSongs();
    }

    render() {
        switch (this.props.klass) {
            case "splash-page":
                this.songs = this.props.latestTwelve; 
                break;
            default:
                break;
        }
        if (!this.songs) {
            return (
                <img src={window.loadingPizza} className="loading"></img>
            );
        }
        return (
            <ul>
                {this.songs.map((song) => {
                    return (
                    <SongsIndexItem
                    key={song.id}
                    song={song}
                   />
                   );
                })}
            </ul>
        );
    }
}

export default withRouter(connect(msp, mdp)(SongsIndex));