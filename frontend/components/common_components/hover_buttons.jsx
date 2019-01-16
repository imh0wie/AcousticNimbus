import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { removeSong } from "../../actions/song_actions";
import { toggleReloading } from "../../actions/reloading_actions";

const msp = (state) => {
    return ({
        songs: state.entities.songs,
    });
}

const mdp = (dispatch) => {
    return ({
        removeSong: (song) => dispatch(removeSong(song)),
        toggleReloading: () => dispatch(toggleReloading()),
    });
}

class HoverButtons extends React.Component {
    constructor(props) {
        super(props);
        // this.state = {
        //     reloading: false,
        // }
        this.noneStyle = {
            display: "none",
        }
        // this.deleteSong = this.deleteSong.bind(this);
    }

    deleteSong() {
        const song = {
            id: this.props.songId,
            artist_id: this.props.song.artistId,
        }
        this.props.removeSong(song);
        // this.props.toggleReloading();
        // this.props.removeSong(this.props.songId);
    }

    // deleteSong() {
    //     this.props.toggleReloading().then(this.props.removeSong(this.props.songId))
    //     // this.props.toggleReloading();
    //     // this.props.removeSong(this.props.songId);
    // }
    
    render() {
        // if (this.state.reloading) return <img src={window.loadingCool} className="loading"></img>;
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
                return (
                    <div className="hover-buttons">
                        <button><i className="fas fa-angle-double-down"></i></button>
                        <button><i className="fas fa-trash-alt"></i></button>
                    </div>
                );
            default:
                return null;
        }
    }
}

export default withRouter(connect(msp, mdp)(HoverButtons));