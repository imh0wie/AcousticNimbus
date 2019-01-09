import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { fetchRelevantSongs, fetchSongsOfSpecificUser, emptySongsOfSpecificUser, emptyFollowedSongs } from "../../../actions/song_actions";
import SongsListItem from "./songs_list_item";

const msp = (state, ownProps) => {
    const songs = state.entities.songs;
    const follows = state.entities.follows;
    const users = state.entities.users;
    const currentUserId = state.session.id;
    return {
        // onPageArtist: users.individualUser[parseInt(ownProps.match.params.userId)],
        songs: songs,
        follows: follows, // homepage
        streamSongs: songs && songs.followedSongs ? Object.values(songs.followedSongs).reverse() : null, // homepage
        currentSongs: songs && songs.songsOfSpecificUser ? Object.values(songs.songsOfSpecificUser).reverse() : null, // user-show-page
        currentUserId: currentUserId,
    };
};

const mdp = (dispatch) => {
  return ({
      fetchRelevantSongs: (userId) => dispatch(fetchRelevantSongs(userId)),
      fetchSongsOfSpecificUser: (userId) => dispatch(fetchSongsOfSpecificUser(userId)),
      emptySongsOfSpecificUser: (defaultState) => dispatch(emptySongsOfSpecificUser(defaultState)),
      emptyFollowedSongs: (defaultState) => dispatch(emptyFollowedSongs(defaultState)),
  });
};


class SongsList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            counter: 0,
        }
        this.counter = 0;
    }
    
    componentDidMount() {
        switch (this.props.klass) {
            case "stream-page":
                if (!this.songs) {
                    const defaultState = {
                        followedSongs: null,
                        likedSongs: this.props.songs ? this.props.songs.likedSongs : null,
                        songsOfSpecificUser: this.props.songs ? this.props.songs.songsOfSpecificUser : null,
                        likedSongsOfSpecificUser: this.props.songs ? this.props.songs.likedSongsOfSpecificUser : null,
                        individualSong: this.props.songs ? this.props.songs.individualSong : null,
                    };
                    this.props.emptyFollowedSongs(defaultState);
                    this.props.fetchRelevantSongs(this.props.currentUserId).then(
                        this.setState({
                            loading: false
                        })
                    );
                }
                break;
            case "user-show-page":
                // if (!this.songs) {
                    const defaultState = {
                        followedSongs: this.props.songs ? this.props.songs.followedSongs : null,
                        likedSongs: this.props.songs ? this.props.songs.likedSongs : null,
                        songsOfSpecificUser: null,
                        likedSongsOfSpecificUser: this.props.songs ? this.props.songs.likedSongsOfSpecificUser : null,
                        individualSong: this.props.songs ? this.props.songs.individualSong : null,
                    }
                    this.props.emptySongsOfSpecificUser(defaultState);
                    this.props.fetchSongsOfSpecificUser(this.props.onPageArtist.id).then(
                        this.setState({
                            loading: false
                        })
                    );
                // }       
                break;
            default:
                break;
        }
    }

    componentWillReceiveProps() {
        switch (this.props.klass) {
            case "stream-page":
                if (!this.songs && this.state.counter > 1) {
                    this.props.fetchRelevantSongs(this.props.currentUserId);
                }
                this.setState({
                    counter: this.state.counter + 1
                });
                break;
            case "user-show-page":
                // if (!this.songs) {
                //     this.props.fetchSongsOfSpecificUser(this.props.onPageArtist.id).then(
                //         this.setState({
                //             loading: false
                //         })
                //     );
                // }
                if (!this.songs && this.counter > 1) {
                    this.props.fetchRelevantSongs(this.props.currentUserId);
                }
                this.counter += 1;
                break;
            default:
                break;
        }
    }

    render() {
        switch (this.props.klass) {
            case "stream-page":
                this.songs = this.props.streamSongs;
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
                                itemSong={song}
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
