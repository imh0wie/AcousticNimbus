import React from "react";
import ReactPlayer from "react-player";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import { fetchSongs } from "../../../actions/song_actions";
import { setCurrentSong, playSong, pauseSong, setElapsedTo } from "../../../actions/current_song_actions";
import { latest, shuffle } from "../../../util/song_api_util";

const msp = (state) => {
    debugger
    return {
        latestTwelve: latest(12, state.entities.songs),
        latestTwenty: latest(20, state.entities.songs),
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
        setElapsedTo: (time) => dispatch(setElapsedTo(time)),
    });
}

class PlayerBar extends React.Component {
    constructor(props) {
        super(props);
        this.repeat = ["none", "all", "single"];
        this.state = {
            playing: this.props.currentSong.playing,
            elapsed: this.props.currentSong.elapsed,
            sliding: false,
            muted: true,
            duration: null,
            volume: 0.60,
            shuffle: false,
            loop: this.repeat[0],
        };
        this.ref = this.ref.bind(this);
        this.renderPlayPauseButton = this.renderPlayPauseButton.bind(this);
        this.handleProgress = this.handleProgress.bind(this);
        this.handleDuration = this.handleDuration.bind(this);
        this.handleOver = this.handleOver.bind(this);
        this.handlePlayPause = this.handlePlayPause.bind(this);
        this.handlePrevious = this.handlePrevious.bind(this);
        this.handleNext = this.handleNext.bind(this);
        this.handleShuffle = this.handleShuffle.bind(this);
        this.handleLoop = this.handleLoop.bind(this);
        this.showTime = this.showTime.bind(this);
        this.handleSlide = this.handleSlide.bind(this);
        this.handleUnslide = this.handleUnslide.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    // componentDidMount() {
    //     this.props.fetchSongs();
    // }
    ref(player) {
        this.player = player;
    }

    handleProgress(options) {
        if (!this.state.sliding) {
          this.setState({
              elapsed: options.played,
            });
          this.props.setElapsedTo(this.state.elapsed);
        }
    }

    handleDuration(duration) {
        this.setState({
            duration: duration,
        });
    }

    handleOver() {
        this.handleNext(this.props.currentSong);
    }

    // handlePause(song) {
    //     this.props.pauseSong(song);
    // }

    handlePlayPause(currentSong) {
        debugger
        this.props.setCurrentSong(currentSong)
        if (!currentSong.song) {
            this.props.setCurrentSong(currentSong.song);
            this.props.playSong(currentSong.song);

        } else if (currentSong.playing) { 
            this.props.pauseSong(currentSong.song)
        } else {
            this.props.playSong(currentSong.song);
        }
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

    showTime(secs) {
        let date = new Date(null);
        date.setSeconds(secs);
        debugger
        return (
          date.toTimeString().slice(4, 8)
        );
    }

    handleSlide() {
        this.setState({
            sliding: true,
        });
      }
    
    handleUnslide(e) {
        this.setState({
            sliding: false,
        });
        this.player.seekTo(e.currentTarget.value);
    }

    handleChange(e) {
        this.setState({
            elapsed: parseFloat(e.currentTarget.value),
        });
        this.props.setElapsedTo(e.currentTarget.value);
    }

    renderPlayPauseButton() {
        if (this.props.currentSong.playing) {
            return (
                <img src={window.play_bar_pause} className="player-control" 
                // onChange={() => this.handlePlayPause(this.props.currentSong)}
                onClick={() => this.handlePlayPause(this.props.currentSong)}>
                </img>
            );
        } else {
            return (
                <img src={window.play_bar_play} className="player-control" 
                // onChange={() => this.handlePlayPause(this.props.currentSong)}
                onClick={() => this.handlePlayPause(this.props.currentSong)}>
                </img>
            );
        }
    }

    render(){
    // debugger
    if (this.props.currentSong.song) {
        // debugger
        // console.log(this.props.currentSong.playing);
        // console.log(this.props.currentSong)
        // console.log(ReactPlayer)
        return (
        <div className="player-bar-container">
            <div className="player-bar">
                <ReactPlayer 
                    url={this.props.currentSong.song.audioURL}
                    controls={true}
                    ref={this.ref}
                    playing={this.props.currentSong.playing}
                    volume={this.state.volume}
                    width="0px"
                    height="0px"
                    onProgress={this.handleProgress}
                    onDuration={this.handleDuration}
                    onEnded={this.handleOver}
                />
                <div className="player-controls-container">
                    <img src={window.play_bar_previous} className="player-control" onClick={() => this.handlePrevious(this.props.currentSong.song)}></img>
                    {this.renderPlayPauseButton()}
                    <img src={window.play_bar_next} className="player-control" onClick={() => this.handleNext(this.props.currentSong.song)}></img>
                    <img src={window.play_bar_shuffle} className="player-control" onClick={() => this.handleShuffle()}></img>
                    <img src={window.play_bar_loop} className="player-control" onClick={() => this.handleLoop()}></img>
                </div>
                <div className="song-current-progress-container">
                    {this.showTime(Math.round(this.state.duration * this.state.elapsed))}
                </div>
                <div className="song-progress-tracker-container">
                    <div className="song-progress-container">
                        <input
                            className="song-progress"
                            type="range" 
                            min={0} max={1}
                            step="any" 
                            value={this.state.elapsed}
                            onMouseUp={this.handleUnslide}
                            onMouseDown={this.handleSlide}
                            onChange={this.handleChange}
                        />
                    </div>
                </div>
                <div className="song-length-container">
                    {this.showTime(Math.round(this.state.duration))}
                </div>
                <div className="player-bar-song-info-container">
                    <img src={this.props.currentSong.song.imageURL ? this.props.currentSong.song.imageURL : window.default_avatar} className="player-bar-song-img"></img>
                    <div className="player-bar-song-info">
                        <p className="player-bar-song-artist">{this.props.currentSong.song.artist}</p>
                        <p className="player-bar-song-title">{this.props.currentSong.song.title}</p>
                    </div>
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


