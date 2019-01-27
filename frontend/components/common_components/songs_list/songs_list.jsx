import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { fetchFollowedSongs, fetchSongsOfSpecificUser, emptySongsOfSpecificUser, emptyFollowedSongs } from "../../../actions/song_actions";
import SongsListItem from "./songs_list_item";

const msp = (state) => {
    const songs = state.entities.songs;
    return {
        songs: songs,
        follows: state.entities.follows,
        currentSongs: songs && songs.songsOfSpecificUser ? Object.values(songs.songsOfSpecificUser).reverse() : null, // user-show-page
        currentUserId: state.session.id,
    };
};

const mdp = (dispatch) => {
  return ({
      fetchFollowedSongs: (data) => dispatch(fetchFollowedSongs(data)),
      fetchSongsOfSpecificUser: (data) => dispatch(fetchSongsOfSpecificUser(data)),
      emptyFollowedSongs: (defaultState) => dispatch(emptyFollowedSongs(defaultState)),
      emptySongsOfSpecificUser: (defaultState) => dispatch(emptySongsOfSpecificUser(defaultState)),
  });
};


class SongsList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            streamSongs: null,
        }
        switch (this.props.klass) {
            case "stream-page":
                this.state = {
                    loading: true,
                    streamSongs: null,
                    defaultState: {
                        followedSongs: null,
                    },
                    data: {
                        current_user_id: this.props.currentUserId,
                        fetching_followed_songs: true,
                    },
                }
                break;
            case "user-show-page":
                this.state = {
                    loading: true,
                    defaultState: {
                        songsOfSpecificUser: null,
                    },
                    data: {
                        user_id: this.props.onPageArtist.id,
                    },
                }
                break;
            default:
                break;
        }
        this.songs = null;
    }
    
    componentDidMount() {
        switch (this.props.klass) {
            case "stream-page":
                this.props.fetchFollowedSongs(this.state.data);
                break;
            case "user-show-page":
                this.props.fetchSongsOfSpecificUser(this.state.data).then(
                    this.setState({
                        loading: false
                    })
                );   
                break;
            default:
                break;
        }
    }

    componentWillReceiveProps(nextProps) {
        switch (this.props.klass) {
            case "stream-page":
                if ((!this.props.songs || !this.props.songs.followedSongs) && nextProps.songs.followedSongs) {
                    this.setState({
                        streamSongs: Object.values(nextProps.songs.followedSongs).reverse(),
                        loading: false,
                    })
                } else if ((!this.props.follows && nextProps.follows) || (this.props.follows && nextProps.follows && Object.values(this.props.follows.interests).length !== Object.values(nextProps.follows.interests).length)) {
                    this.props.emptyFollowedSongs(this.state.defaultState);
                    this.setState({
                        loading: true,
                    })
                } else if (this.state.loading) {
                    this.props.fetchFollowedSongs(this.state.data);
                }
                break;
            case "user-show-page":
            default:
                break;
        }
    }

    componentWillUnmount() {
         switch (this.props.klass) {
            case "stream-page":
                this.props.emptyFollowedSongs(this.state.defaultState);
                break;
            case "user-show-page":
                this.props.emptySongsOfSpecificUser(this.state.defaultState);
                break;
         }
    }

    render() {
        switch (this.props.klass) {
            case "stream-page":
                this.songs = this.state.streamSongs;
                break;
            case "user-show-page":
                this.songs = this.props.currentSongs;                
                break;
            default:
                break;
        }
        if (this.state.loading || !this.songs) {
            return <img src={window.loadingPizza} className="loading"></img>;
        } else {
            if (this.songs.length === 0) {
                if (this.props.klass === "user-show-page") {
                    return (
                        <div className="ui-msg">
                            <img src={window.noSongs}></img>
                            <p className="h1">Nothing to hear here</p>
                            <p className="h2">{`Follow ${this.props.onPageArtist.username} for updates on sounds they share in the future.`}</p>
                        </div>
                    );
                }
                return <p>Stream is currently empty. Use Charts to find music & audio to listen to.</p>
            } else {
                return (
                    <ul>
                        {this.songs.map((song, idx) => {
                            return (
                                <SongsListItem
                                key={song.id}
                                idx={idx}
                                klass={this.props.klass}
                                songs={this.songs}
                                song={song}
                                songId={song.id}
                                />
                            );
                        })}
                    </ul>
                );
            }
        }
    }
}

export default withRouter(connect(msp, mdp)(SongsList));
