import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { fetchFollowedSongs, fetchSongsOfSpecificUser, emptySongsOfSpecificUser, emptyFollowedAndLikedSongsOf } from "../../../actions/song_actions";
import SongsListItem from "./songs_list_item";

const msp = (state) => {
    const songs = state.entities.songs;
    return {
        songs: songs,
        currentSongs: songs && songs.songsOfSpecificUser ? Object.values(songs.songsOfSpecificUser).reverse() : null, // user-show-page
        currentUserId: state.session.id,
    };
};

const mdp = (dispatch) => {
  return ({
      fetchFollowedSongs: (data) => dispatch(fetchFollowedSongs(data)),
      fetchSongsOfSpecificUser: (data) => dispatch(fetchSongsOfSpecificUser(data)),
      emptySongsOfSpecificUser: (defaultState) => dispatch(emptySongsOfSpecificUser(defaultState)),
      emptyFollowedAndLikedSongsOf: (defaultState) => dispatch(emptyFollowedAndLikedSongsOf(defaultState)),
  });
};


class SongsList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            streamSongs: this.props.songs && this.props.songs.followedSongs ? Object.values(this.props.songs.followedSongs).reverse() : null,
            counter: 0,
        }
        this.songs = null;
    }
    
    componentDidMount() {
        switch (this.props.klass) {
            case "stream-page":
                if (this.songs) {
                    this.setState({
                        loading: true,
                        streamSongs: null,
                    })
                }
                this.data = {
                    current_user_id: this.props.currentUserId,
                    fetching_followed_songs: true,
                }
                this.props.fetchFollowedSongs(this.data);
                break;
            case "user-show-page":
                this.data = {
                    user_id: this.props.onPageArtist.id,
                }
                this.props.fetchSongsOfSpecificUser(this.data).then(
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
                if (!this.songs && this.state.counter > 1) {
                    this.data = {
                        current_user_id: this.props.currentUserId,
                        fetching_followed_songs: true,
                    }
                    this.props.fetchFollowedSongs(this.data);
                }
                this.setState({
                    loading: false,
                    streamSongs: nextProps.songs && nextProps.songs.followedSongs ? Object.values(nextProps.songs.followedSongs).reverse() : null,
                    counter: this.state.counter + 1
                });
                break;
            case "user-show-page":
            default:
                break;
        }
    }

    componentWillUnmount() {
         switch (this.props.klass) {
            case "stream-page":
                this.defaultState = {
                    followedSongs: null,
                    likedSongs: null,
                };
                this.props.emptyFollowedAndLikedSongsOf(this.defaultState);
                break;
            case "user-show-page":
                this.defaultState = {
                    songsOfSpecificUser: null,
                }
                this.props.emptySongsOfSpecificUser(this.defaultState);
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
                                itemSong={song}
                                itemSongId={song.id}
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
