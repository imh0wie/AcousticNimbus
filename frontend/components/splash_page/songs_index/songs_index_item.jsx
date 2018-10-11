import React from "react";

class SongsIndexItem extends React.Component {
    constructor(props) {
        // debugger
        super(props);
        this.renderPlayPauseSign = this.renderPlayPauseSign.bind(this); 
        this.togglePlay = this.togglePlay.bind(this);
    }
    
    // componentWillReceiveProps(newProps) {
    // }
    
    togglePlay(song) {
        // debugger
        if (!this.props.currentSong.song || song.id !== this.props.currentSong.song.id ) {
            // debugger
            this.props.setCurrentSong(song);
            this.props.playSong(song);
        } else if (song.id === this.props.currentSong.song.id && this.props.currentSong.playing) {
            // debugger
            this.props.pauseSong(song);
        } else if (song.id === this.props.currentSong.song.id && !this.props.currentSong.playing) {
            // debugger
            this.props.playSong(song);
        }
    }

      renderPlayPauseSign(song) {
        // debugger
        if (!this.props.currentSong.song || song.id !== this.props.currentSong.song.id || !this.props.currentSong.playing) {
            // debugger
            return (
                <div className="splash-page-songs-index-item-play-container">
                    <img src={window.play_button} className="splash-page-songs-index-item-play-sign" onClick={() => this.togglePlay(song)} />
                </div>
            );
        } else if (song.id === this.props.currentSong.song.id && this.props.currentSong.playing) {
            // debugger
            return (
                <div className="splash-page-songs-index-item-pause-container">
                    <img src={window.pause_button} className="splash-page-songs-index-item-pause-sign" onClick={() => this.togglePlay(song)} />
                </div>
            );
        }
        debugger
      }
    
      render() {
          debugger
        return (
          <li className="splash-page-songs-index-item">
            <div className="splash-page-songs-index-item-img-container">
                <img src={this.props.song.imageURL} className="splash-page-songs-index-item-img" />
                {this.renderPlayPauseSign(this.props.song)}
            </div>
            <h4 className="splash-page-songs-index-item-title">
              {this.props.song.title.length >= 23 ? this.props.song.title.slice(0, 23) + "..." : this.props.song.title}
            </h4>
            <p className="splash-page-songs-index-item-artist">{this.props.song.artist}</p>
          </li>
        );
    }
    
}

export default SongsIndexItem;