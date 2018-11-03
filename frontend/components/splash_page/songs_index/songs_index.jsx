import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { fetchSongs } from "../../../actions/song_actions";
import { setCurrentSong, playSong, pauseSong } from "../../../actions/current_song_actions";
import { latest } from "../../../util/song_api_util";
import SongsIndexItem from "./songs_index_item";

const msp = (state) => {
    return {
      songs: latest(12, state.entities.songs),
      currentUser: state.entities.users[state.session.id],
      currentSong: state.ui.currentSong,
    };
};

const mdp = (dispatch) => {
    return ({
        fetchSongs: () => dispatch(fetchSongs()),
        setCurrentSong: (song) => dispatch(setCurrentSong(song)),
        playSong: () => dispatch(playSong()),
        pauseSong: () => dispatch(pauseSong()),
    });
};

class SongsIndex extends React.Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.props.fetchSongs();
    }

    render() {
        return (
            <ul>
                {this.props.songs.map((song) => {
                    return (
                    <SongsIndexItem
                    key={song.id}
                    song={song}
                    currentSong={this.props.currentSong}
                    setCurrentSong={this.props.setCurrentSong}
                    playSong={this.props.playSong}
                    pauseSong={this.props.pauseSong}
                   />
                   );
                })}
            </ul>
        );
    }
}

export default withRouter(connect(msp, mdp)(SongsIndex));