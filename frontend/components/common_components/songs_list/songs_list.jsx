import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { fetchRelevantSongs } from "../../../actions/song_actions";
import SongsListItem from "./songs_list_item";

const msp = (state, ownProps) => {
    const songs = state.entities.songs;
    const follows = state.entities.follows;
    const users = state.entities.users;
    const currentUserId = state.session.id;
    return {
        onPageArtist: users[parseInt(ownProps.match.params.userId)],
        follows: follows, // homepage
        streamSongs: songs && songs.followedSongs ? Object.values(songs.followedSongs).reverse() : null, // homepage
        // currentSongs: songsOf(parseInt(ownProps.match.params.userId), songs),
        currentUserId: currentUserId,
    };
};

const mdp = (dispatch) => {
  return ({
      fetchRelevantSongs: (userId) => dispatch(fetchRelevantSongs(userId)),
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
        switch (this.props.klass) {
            case "stream-page":
                if (!this.songs) this.props.fetchRelevantSongs(this.props.currentUserId);
                break;
            case "user-show-page":
                if (!this.songs);          
                break;
        }
        this.setState({
            loading: false,
        })
    }

    componentWillReceiveProps() {
        if (!this.songs) {
            this.props.fetchRelevantSongs(this.props.currentUserId);
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
