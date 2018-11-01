import React from "react";
import { Link } from "react-router-dom";
import Waveform from "../../../common_components/waveform";

class ItemPlayer extends React.Component {
    constructor(props) {
        super(props);
        this.togglePlayPause = this.togglePlayPause.bind(this);
        this.renderPlayPauseSign = this.renderPlayPauseSign.bind(this);
    }

    togglePlayPause() {
        debugger
        if (!this.props.currentSong.song || this.props.itemSong.id !== this.props.currentSong.song.id) {
          this.props.setCurrentSong(this.props.itemSong);
          this.props.playSong();
          debugger
        } else if (this.props.itemSong.id === this.props.currentSong.song.id) {
          this.props.currentSong.playing ? this.props.pauseSong() : this.props.playSong() ;
        }
    }

    renderPlayPauseSign() {
        debugger
        if (!this.props.currentSong.song || this.props.itemSong.id !== this.props.currentSong.song.id) {
            debugger
            return (
                <img src={window.play_button} className="play-sign" onClick={() => this.togglePlayPause()} />       
            );
        } else if (this.props.itemSong.id === this.props.currentSong.song.id && this.props.currentSong.playing) {
            return (
                <img src={window.pause_button} className="pause-sign" onClick={() => this.togglePlayPause()} />
            );
        } else if (this.props.itemSong.id === this.props.currentSong.song.id && !this.props.currentSong.playing) {
            return (
                <img src={window.play_button} className="play-sign" onClick={() => this.togglePlayPause()} />          
            );
        }
    }

    render() {
        debugger
        return (
            <div className="item-player-container">
                <img src={this.props.itemSong.imageURL ? this.props.itemSong.imageURL : window.default_avatar}/>
                <div className="item-player">
                    <div className="top">
                        <div className="left">
                            {this.renderPlayPauseSign()}
                            <div className="song-info">
                                <Link to={`/users/${this.props.itemSong.artistId}`}>{this.props.itemSong.artist}</Link>
                                <Link to="" className="title">{this.props.itemSong.title}</Link>
                            </div>
                        </div>
                        <div className="right">
                            <h4 className="genre">#{this.props.itemSong.genre}</h4>
                        </div>
                    </div>
                    <div className="waveform-container">
                        <Waveform 
                            klass="waveform"
                            itemSong={this.props.itemSong}
                            itemSongId={this.props.itemSongId}
                            currentSong={this.props.currentSong}
                            // setCurrentSong={this.props.setCurrentSong}
                            // setElapsedTo={this.props.setElapsedTo}
                        />
                    </div>
                    <div className="bottom">
                        <div className="left">
                            <button className="social-button"><i class="fas fa-heart"></i></button>
                        </div>
                        <div className="right">
                            <p><i class="fas fa-play"></i></p>
                            <p><i class="fas fa-comment-alt"></i></p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ItemPlayer;