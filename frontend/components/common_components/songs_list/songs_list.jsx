import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { fetchSongs, fetchFollowedSongs } from "../../../actions/song_actions";
import { fetchFollowingsOf } from "../../../actions/follow_actions";
import { songsOf, followedSongs } from "../../../util/song_api_util";
import { areIdenticalArrs } from "../../../util/general_api_util";
// import { followedSongs } from "../../../util/follow_api_util";
import SongsListItem from "./songs_list_item";

const msp = (state, ownProps) => {
    const songs = state.entities.songs;
    const follows = state.entities.follows;
    const users = state.entities.users;
    const currentUserId = state.session.id;
    return {
        onPageArtist: users[parseInt(ownProps.match.params.userId)],
        follows: follows, // homepage
        // streamSongs: followedSongs(follows, songs), // homepageå
        streamSongs: followedSongs(songs), // homepage
        // currentSongs: songsOf(parseInt(ownProps.match.params.userId), songs),
        currentUserId: currentUserId,
    };
};

const mdp = (dispatch) => {
  return ({
    //   fetchSongs: () => dispatch(fetchSongs()),
    //   fetchFollowingsOf: (followerId) => dispatch(fetchFollowingsOf(followerId)),
      fetchFollowedSongs: (userId) => dispatch(fetchFollowedSongs(userId)),
  });
};


class SongsList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
        }
    }
    
    componentDidMount() {
        // if (!this.songs) this.props.fetchSongs();
        // if (this.props.klass !== "user-show-page") {
        //     // This component does not need to fetch data
        //     // user show page because data would have 
        //     // already been fetched at this point.
        //     this.props.fetchFollowingsOf(this.props.currentUserId);
        // }
        switch (this.props.klass) {
            case "stream-page":
                if (!this.songs) this.props.fetchFollowedSongs(this.props.currentUserId);
                break;
            case "user-show-page":
                if (!this.songs);          
                break;
        }
        this.setState({
            loading: false,
        })
    }

    componentWillReceiveProps(nextProps) {
        // debugger)
        if (this.props.streamSongs) this.oldSongs = this.props.streamSongs.map(song => song.id);
        if (nextProps.streamSongs) this.newSongs = nextProps.streamSongs.map(song => song.id);
        if (!this.songs || !areIdenticalArrs(this.oldSongs, this.newSongs)) {
        // if (this.props.streamSongs !== nextProps.streamSongs) {
        //     debugger
            this.props.fetchFollowedSongs(this.props.currentUserId);
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
