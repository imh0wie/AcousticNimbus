import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { fetchIntroSongs, emptyIntroSongs } from "../../../actions/song_actions";
import SongsIndexItem from "./songs_index_item";

const msp = (state) => {
    const songs = state.entities.songs;
    return {
      introSongs: songs && songs.introSongs ? Object.values(songs.introSongs) : null,
    };
};

const mdp = (dispatch) => {
    return ({
        fetchIntroSongs: (payload) => dispatch(fetchIntroSongs(payload)),
        emptyIntroSongs: (state) => dispatch(emptyIntroSongs(state)),
    });
};

class SongsIndex extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const payload = {
            number: 12,
        }
        this.props.fetchIntroSongs(payload);
    }

    componentWillUnmount() {
        const defaultState = {
            introSongs: null,
        }
        this.props.emptyIntroSongs(defaultState)
    }

    render() {
        switch (this.props.klass) {
            case "splash-page":
                this.songs = this.props.introSongs; 
                break;
            default:
                break;
        }
        if (!this.songs) {
            return (
                <img src={window.loadingPizza} className="loading"></img>
            );
        } else if (this.songs.length === 0) {
            switch (this.props.klass) {
                case "splash-page":
                    this.message = "There are no songs on Acoustic Nimbus by far :("; 
                    break;
                default:
                    break;
            }
            return (
                <p className="ui-msg">{this.message}</p>
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