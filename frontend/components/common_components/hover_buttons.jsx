import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { removeSong } from "../../actions/song_actions";
import { addToPlayNext, removeSongFromQueue } from "../../actions/queue_actions"

const mdp = (dispatch) => {
    return ({
        addToPlayNext: (song) => dispatch(addToPlayNext(song)),
        removeSong: (song) => dispatch(removeSong(song)),
        removeSongFromQueue: (song) => dispatch(removeSongFromQueue(song)),
    });
}

class HoverButtons extends React.Component {
    constructor(props) {
        super(props);
        this.noneStyle = {
            display: "none",
        }
    }

    deleteSong() {
        const song = {
            id: this.props.songId,
            artist_id: this.props.song.artistId,
        }
        this.props.removeSong(song);
    }
    
    render() {
        switch (this.props.klass) {
            case "your-songs-list-item":
                return (
                    <div className="hover-buttons">
                        <button style={this.noneStyle}><i className="fas fa-heart"></i></button>
                        <button style={this.noneStyle}><i className="fas fa-pen"></i></button>
                        <button onClick={() => this.deleteSong()}><i className="fas fa-trash"></i></button>
                    </div>
                );
            case "queue-item":
                const songData = {
                    song: this.props.song,
                    currentSong: this.props.currentSong,
                }
                return (
                    <div className="hover-buttons">
                        <button onClick={() => this.props.addToPlayNext(songData)}><i className="fas fa-angle-double-down"></i></button>
                        <button onClick={() => this.props.removeSongFromQueue(this.props.song)}><i className="fas fa-trash-alt"></i></button>
                    </div>
                );
            default:
                return null;
        }
    }
}

export default withRouter(connect(null, mdp)(HoverButtons));