import React from "react";
import ReactPlayer from "react-player";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import { fetchSongs } from "../../../actions/song_actions";
import { setCurrentSong, playSong, pauseSong } from "../../../actions/current_song_actions";
import { latest, shuffle } from "../../../util/song_api_util";

const msp = (state) => {
    // debugger
    return {
        latestTwelve: latest(12, state.entities.songs),
        shuffled: shuffle(12, state.entities.songs),
        currentSong: state.ui.currentSong,
    }
}

const mdp = (dispatch) => {
    return ({
        fetchSongs: () => dispatch(fetchSongs()),
        setCurrentSong: (song) => dispatch(setCurrentSong(song)),
        playSong: (song) => dispatch(playSong(song)),
        pauseSong: (song) => dispatch(pauseSong(song)),
    });
}

class PlayerBar extends React.Component {
    constructor(props) {
        super(props);
        this.repeat = ["none", "all", "single"];
        this.state = {
            playing: this.props.currentSong.playing,
            elapsed: this.props.currentSong.elapsed,
            muted: true,
            volume: 0.60,
            shuffle: false,
            loop: this.repeat[0],
        };
        this.renderPlayPauseButton = this.renderPlayPauseButton.bind(this);
        this.handlePause = this.handlePause.bind(this);
        this.handlePlay = this.handlePlay.bind(this);
        this.handlePrevious = this.handlePrevious.bind(this);
        this.handleNext = this.handleNext.bind(this);
        this.ref = this.ref.bind(this);
        this.handleShuffle = this.handleShuffle.bind(this);
        this.handleLoop = this.handleLoop.bind(this);
    }

    componentWillMount() {
        this.props.fetchSongs();
    }
    

    handlePause(song) {
        this.props.pauseSong(song);
    }

    handlePlay(song) {
        this.props.playSong(song);
    }

    handlePrevious(currentSong) {
        let songs = this.props.latestTwelve;
        if (this.state.shuffle) {
            songs = shuffle(songs);
        }
        const songsIdx = songs.map((song, i) => i);
        let currentSongIdx = songsIdx.find((idx) => {
           const song = songs[idx];
           return song.id === currentSong.id
        });
        const nextSongIdx = (currentSongIdx - 1) < 0 ? songs.length - 1 : currentSongIdx - 1;
        const nextSong = songs[nextSongIdx];
        // debugger
        this.props.setCurrentSong(nextSong);
        this.props.playSong(nextSong);
    }

    handleNext(currentSong) {
        let songs = this.props.latestTwelve;
        debugger
        if (this.state.shuffle) {
            songs = this.props.shuffled;
        }
        debugger
        const songsIdx = songs.map((song, i) => i);
        // debugger
        let currentSongIdx = songsIdx.find((idx) => {
           const song = songs[idx];
           return song.id === currentSong.id
        });
        const nextSongIdx = (currentSongIdx + 1) === songs.length ? 0 : currentSongIdx + 1;
        const nextSong = songs[nextSongIdx];
        // debugger
        this.props.setCurrentSong(nextSong);
        this.props.playSong(nextSong);
    }

    handleShuffle() {
        debugger
        this.setState({
            shuffle: !this.state.shuffle
        });
    }
    
    handleLoop() {
        this.repeat.push(this.repeat.shift());
    }

    ref(player) {
        this.player = player;
      }
     
    // renderTime(elapsedTime) {
    //   while (elapsedTime)
    // }
//   getDuration(src) {
//     let audio = new Audio(src);
//     const audioLength = audio.getDuration();
//     return audioLength;
//   }   

//   getPlayed(src) {
    
//   }

  renderPlayPauseButton() {
      if (this.props.currentSong.playing) {
          return (
            <img src={window.play_bar_pause} className="player-control" onClick={() => this.handlePause(this.props.currentSong.song)}></img>
          );
      } else {
          return (
            <img src={window.play_bar_play} className="player-control" onClick={() => this.handlePlay(this.props.currentSong.song)}></img>
          );
      }
  }

  render() {
    // debugger
    if (this.props.currentSong.song) {
        // debugger
        return (
        <div className="player-bar-container">
            <div className="player-bar">
                <ReactPlayer 
                    url={this.props.currentSong.audioURL}
                    ref={this.ref}
                    playing={this.props.currentSong.playing}
                    volume={this.state.volume}
                    width="0px"
                    height="0px"
                    onProgress={this.onProgress}
                    onDuration={this.onDuration}
                    onEnded={this.onEnded}
                />
                <div className="player-controls-container">
                    <img src={window.play_bar_previous} className="player-control" onClick={() => this.handlePrevious(this.props.currentSong.song)}></img>
                    {this.renderPlayPauseButton()}
                    <img src={window.play_bar_next} className="player-control" onClick={() => this.handleNext(this.props.currentSong.song)}></img>
                    <img src={window.play_bar_shuffle} className="player-control" onClick={() => this.handleShuffle()}></img>
                    <img src={window.play_bar_loop} className="player-control" onClick={() => this.handleLoop()}></img>
                </div>
                <div className="song-progress-tracker-container">
                    <div className="song-progress-container">
                    </div>
                    <div className="song-progress-slider">
                    </div>
                </div>
                <div className="song-length-container">
                    
                </div>
            </div>
                
        </div>
        );
    } else {
        return (
            <div></div>
        );
    }
  }
}

export default withRouter(connect(msp, mdp)(PlayerBar));


