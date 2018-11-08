import React from "react";
import { likesOf, likeOf } from "../../../util/like_api_util";
import { commentsOf } from "../../../util/comment_api_util";
import SongsListItem from "./songs_list_item";

class SongsList extends React.Component {
    constructor(props) {
        super(props);
    }
    
    componentDidMount() {
        this.props.fetchSongs();
        this.props.fetchLikes();
        this.props.fetchComments();
        if (this.props.klass !== "user-show-page") {
            this.props.fetchFollows();
            this.props.fetchUsers();
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
        if (!this.songs) {
            return <img src={window.loading5} className="loading"></img>;
        } else {
            if (this.songs.length === 0) {
                if (this.props.klass === "user-show-page") return <img src={window.loading5} className="loading"></img>; 
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
                                itemLikes={likesOf("Song", song.id, this.props.likes)}
                                itemComments={commentsOf(song.id, this.props.comments)}
                                itemArtist={this.props.users[song.artistId]}
                                currentSong={this.props.currentSong}
                                currentLike={likeOf("Song", song.id, this.props.currentUser, this.props.likes)}
                                currentUser={this.props.currentUser}
                                currentUserId={this.props.currentUserId}
                                setCurrentSong={this.props.setCurrentSong}
                                playSong={this.props.playSong}
                                pauseSong={this.props.pauseSong}
                                setElapsedTo={this.props.setElapsedTo}
                                createLike={this.props.createLike}
                                removeLike={this.props.removeLike}
                                />
                            );
                        })}
                    </ul>
                );
            }
        }
    }
}

export default SongsList;
