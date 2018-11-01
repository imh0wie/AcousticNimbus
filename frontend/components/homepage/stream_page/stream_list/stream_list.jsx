import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { fetchSongs } from "../../../../actions/song_actions";
import { setCurrentSong, playSong, pauseSong, setElapsedTo } from "../../../../actions/current_song_actions";
import { fetchFollows } from "../../../../actions/follow_actions";
import { fetchUsers } from "../../../../actions/user_actions";
import { latest } from "../../../../util/song_api_util";
import { followedUsersOf, followedSongs} from "../../../../util/follow_api_util";
import StreamListItem from "./stream_list_item";
import { songsOf } from "../../../../util/song_api_util"

const msp = (state) => {
    const songs = state.entities.songs;
    const follows = state.entities.follows;
    const users = state.entities.users;
    const currentUser = state.entities.users[state.session.id];
    const followedArtists = followedUsersOf(currentUser, follows, users);
    return {
        users: users,
        // followings: followingsOf(currentUser, follows),
        streamSongs: followedSongs(followedArtists, songs),
        currentUser: currentUser,
        currentSong: state.ui.currentSong,
    };
};

const mdp = (dispatch) => {
  return ({
      fetchSongs: () => dispatch(fetchSongs()),
      setCurrentSong: (song) => dispatch(setCurrentSong(song)),
      playSong: () => dispatch(playSong()),
      pauseSong: () => dispatch(pauseSong()),
      setElapsedTo: (time) => dispatch(setElapsedTo(time)),
      fetchFollows: () => dispatch(fetchFollows()),
      fetchUsers: () => dispatch(fetchUsers()),
  });
};

class StreamList extends React.Component {
    constructor(props) {
        super(props);
        // this.state = {
        //     loaded: false,
        // }
        debugger
    }
    // componentWillMount() {
        
    // }
    componentDidMount() {
        debugger
        this.props.fetchSongs();
        this.props.fetchFollows();
        this.props.fetchUsers();
    }

    render() {
        if (!this.props.streamSongs) {
            debugger
            return <img src={window.loading2} className="loading"/>;
        } else {
            debugger
            if (this.props.streamSongs.length === 0) {
                return <p>Stream is currently empty. Use Charts to find music & audio to listen to.</p>
            } else {
                debugger
                return (
                    <ul className="stream-list">
                        {this.props.streamSongs.map((song, idx) => {
                            return (
                                <StreamListItem
                                key={song.id}
                                idx={idx}
                                itemSong={song}
                                artist={this.props.users[song.artistId]}
                                currentSong={this.props.currentSong}
                                setCurrentSong={this.props.setCurrentSong}
                                playSong={this.props.playSong}
                                pauseSong={this.props.pauseSong}
                                setElapsedTo={this.props.setElapsedTo}
                                />
                            );
                        })}
                    </ul>
                );
            }
        }
    }
}

export default withRouter(connect(msp, mdp)(StreamList));
