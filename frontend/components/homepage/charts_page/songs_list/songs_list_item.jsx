import React from "react";
import { Link } from "react-router-dom";

class SongsListItem extends React.Component {
    constructor(props) {
        super(props);
        // this.redirectToShowPage = this.redirectToShowPage.bind(this);
        this.togglePlay = this.togglePlay.bind(this);
        this.renderPlayPauseSign = this.renderPlayPauseSign.bind(this); 
    }

// componentWillReceiveProps(newProps) {
// }

    // redirectToShowPage(song) {
    //     debugger
    //     this.props.setCurrentSong(song).then(this.props.history.push(`/songs/${action.song.id}`));
    // }

    togglePlay(song) {
        // debugger
        if (!this.props.currentSong.song || song.id !== this.props.currentSong.song.id ) {
            // debugger
            this.props.setCurrentSong(song);
            this.props.playSong();
        } else if (song.id === this.props.currentSong.song.id && this.props.currentSong.playing) {
            // debugger
            this.props.pauseSong();
        } else if (song.id === this.props.currentSong.song.id && !this.props.currentSong.playing) {
            // debugger
            this.props.playSong();
        }
    }

  renderPlayPauseSign(song) {
    // debugger
    if (!this.props.currentSong.song || song.id !== this.props.currentSong.song.id || !this.props.currentSong.playing) {
        // debugger
        return (
            <div className="charts-songs-list-item-play-container">
                <img src={window.play_button} className="charts-songs-list-item-play-sign" onClick={() => this.togglePlay(song)} />
            </div>
        );
    } else if (song.id === this.props.currentSong.song.id && this.props.currentSong.playing) {
        // debugger
        return (
            <div className="charts-songs-list-item-pause-container">
                <img src={window.pause_button} className="charts-songs-list-item-pause-sign" onClick={() => this.togglePlay(song)} />
            </div>
        );
    }
  }

  render() {
    return (
      <li className="charts-songs-list-item">
        <p className={(this.props.idx + 1 >= 10) ? "double" : "charts-songs-list-item-rank"}>{this.props.idx + 1}</p> 
        <div className="charts-songs-list-item-img-container">
            <img src={this.props.song.imageURL} className="charts-songs-list-item-img" />
            {this.renderPlayPauseSign(this.props.song)}
        </div>
        <div className="charts-songs-list-item-info-container">
            <Link to={`/users/${this.props.song.artist.id}`} className="charts-songs-list-item-artist">{this.props.song.artist}</Link>
            <Link to={`/songs/${this.props.song.id}`} className="charts-songs-list-item-title">
                {this.props.song.title.length >= 23 ? this.props.song.title.slice(0, 23) + "..." : this.props.song.title}
            </Link>
        </div>
      </li>
    );
  }
}

export default SongsListItem;
