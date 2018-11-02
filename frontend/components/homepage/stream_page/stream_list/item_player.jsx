import React from "react";
import { Link } from "react-router-dom";
import SocialElements from "../../../common_components/social_elements";
import Waveform from "../../../common_components/waveform";

class ItemPlayer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            likeableType: "Song",
            likeableId: this.props.itemSong.id,
            likerId: this.props.currentUser.id,
        }
        this.handleLike = this.handleLike.bind(this);
        this.togglePlayPause = this.togglePlayPause.bind(this);
        this.renderPlayPauseSign = this.renderPlayPauseSign.bind(this);
    }
    
    handleLike(e) {
        e.preventDefault();
        if (this.props.currentLike) {
            this.props.removeLike(this.props.currentLike.id);
        } else {
            const like = {
                likeable_type: this.state.likeableType,
                likeable_id: this.state.likeableId,
                liker_id: this.state.likerId,
            }
            this.props.createLike(like);
        }
    }

    togglePlayPause() {
        if (!this.props.currentSong.song || this.props.itemSong.id !== this.props.currentSong.song.id) {
          this.props.setCurrentSong(this.props.itemSong);
          this.props.playSong();
        } else if (this.props.itemSong.id === this.props.currentSong.song.id) {
          this.props.currentSong.playing ? this.props.pauseSong() : this.props.playSong() ;
        }
    }

    renderPlayPauseSign() {
        if (!this.props.currentSong.song || this.props.itemSong.id !== this.props.currentSong.song.id) {
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
                    <SocialElements
                        klass="item-player"
                        itemId={this.props.itemSong.id}
                        itemLikes={this.props.itemLikes}
                        itemComments={this.props.itemComments}
                        currentLike={this.props.currentLike}
                        currentLikes={this.props.currentLikes}
                        createLike={this.props.createLike}
                        removeLike={this.props.removeLike}
                        currentUser={this.props.currentUser}
                    />
                </div>
            </div>
        );
    }
}

export default ItemPlayer;