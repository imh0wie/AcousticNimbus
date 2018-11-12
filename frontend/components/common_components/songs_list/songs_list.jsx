import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { fetchSongs } from "../../../actions/song_actions";
import { fetchLikes } from "../../../actions/like_actions";
import { fetchFollows } from "../../../actions/follow_actions";
import { fetchComments } from "../../../actions/comment_actions";
import { fetchUsers } from "../../../actions/user_actions";
import { songsOf } from "../../../util/song_api_util";
import { isEmpty } from "../../../util/general_api_util";
import { followedUsersOf, followedSongs} from "../../../util/follow_api_util";
import SongsListItem from "./songs_list_item";

const msp = (state, ownProps) => {
    const songs = state.entities.songs;
    const follows = state.entities.follows;
    const users = state.entities.users;
    const followedArtists = followedUsersOf(users[state.session.id], follows, users);
    return {
        onPageArtist: users[parseInt(ownProps.match.params.userId)],
        follows: follows,
        streamSongs: followedSongs(followedArtists, songs),
        currentSongs: songsOf(users[parseInt(ownProps.match.params.userId)], songs),
    };
};

const mdp = (dispatch) => {
  return ({
      fetchSongs: () => dispatch(fetchSongs()),
      fetchLikes: () => dispatch(fetchLikes()),
      fetchFollows: () => dispatch(fetchFollows()),
      fetchComments: () => dispatch(fetchComments()),
      fetchUsers: () => dispatch(fetchUsers()),
  });
};


class SongsList extends React.Component {
    constructor(props) {
        super(props);
    }
    
    componentDidMount() {
        this.props.fetchSongs().then(
            this.props.fetchLikes().then(
                this.props.fetchComments()
            )
        );
        if (this.props.klass !== "user-show-page") {
            // This component does not need to fetch data
            // user show page because data would have 
            // already been fetched at this point.
            this.props.fetchFollows().then(this.props.fetchUsers());
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
        if (!this.songs || isEmpty(this.props.follows)) {
            return <img src={window.loading5} className="loading"></img>;
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
