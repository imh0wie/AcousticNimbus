import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { fetchSongs } from "../../../../actions/song_actions"
import { songsOf } from "../../../../util/song_api_util";
import YourSongsListItem from "./your_songs_list_item";

const msp = (state) => {
    const currentUserId = state.session.id;
    return ({
        currentSongs: songsOf(currentUserId, state.entities.songs),
        currentUserId: currentUserId,
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
            currentSongs: this.props.currentSongs,
        }
    }

    componentDidMount() {
        this.props.fetchSongs();
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.currentSongs !== nextProps.currentSongs) {
            debugger
            this.setState({
                loading: false,
                currentSongs: nextProps.currentSongs,
            });
        }
    }

    render() {
        if (this.state.loading || !this.state.currentSongs) return <ul><img src={window.loadingPizza} className="loading"></img></ul>;
        return (
            <ul>
                {this.state.currentSongs.map((song, idx) => {
                    return <YourSongsListItem song={song} key={idx}/>;
                })}
            </ul>
        );
    }
}

export default withRouter(connect(msp, mdp)(YourSongsList));





