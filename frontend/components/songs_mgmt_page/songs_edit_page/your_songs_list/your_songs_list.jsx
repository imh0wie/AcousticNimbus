import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { fetchSongs } from "../../../../actions/song_actions"
import { songsOf } from "../../../../util/song_api_util";
import YourSongsListItem from "./your_songs_list_item";

const msp = (state) => {
    return ({
        currentSongs: songsOf(state.session.id, state.entities.songs),
    });
};

const mdp = (dispatch) => {
    return ({
        fetchSongs: () => dispatch(fetchSongs())
    });
};

class YourSongsList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
        }
    }

    componentDidMount() {
        this.props.fetchSongs();
        this.setState({
            loading: false,
        });
    }

    render() {
        if (this.state.loading || !this.props.currentSongs) return <ul><img src={window.loading5} className="loading"></img></ul>;
        return (
            <ul>
                {this.props.currentSongs.map((song) => {
                    return <YourSongsListItem song={song} />;
                })}
            </ul>
        );
    }
}

export default withRouter(connect(msp, mdp)(YourSongsList));





