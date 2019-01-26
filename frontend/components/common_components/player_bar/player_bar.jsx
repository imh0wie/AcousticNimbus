import React from "react";
import ReactPlayer from "react-player";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import { setCurrentSong, playSong, pauseSong, setElapsedTo, muteSong, unmuteSong } from "../../../actions/current_song_actions";
import { toggleLoop, toggleShuffle } from "../../../actions/player_actions";
import { toggleQueueList } from "../../../actions/queue_list_actions";

const msp = (state) => {
    return {
        queue: state.ui.queue,
        player: state.ui.player,
        currentSong: state.ui.currentSong,
    }
}

const mdp = (dispatch) => {
    return ({
        setCurrentSong: (song) => dispatch(setCurrentSong(song)),
        playSong: () => dispatch(playSong()),
        pauseSong: () => dispatch(pauseSong()),
        setElapsedTo: (time) => dispatch(setElapsedTo(time)),
        muteSong: () => dispatch(muteSong()),
        unmuteSong: () => dispatch(unmuteSong()),
        toggleLoop: () => dispatch(toggleLoop()),
        toggleShuffle: () => dispatch(toggleShuffle()),
        toggleQueueList: () => dispatch(toggleQueueList()),
    });
}

class PlayerBar extends React.Component {
    constructor(props) {
        super(props);
        this.repeat = ["none", "all", "single"];
        this.state = {
            elapsed: this.props.currentSong.elapsed,
            sliding: false,
            duration: null,
            volume: 0.60,
        };
        this.ref = this.ref.bind(this);
        this.handleProgress = this.handleProgress.bind(this);
        this.handleDuration = this.handleDuration.bind(this);
        this.handleOver = this.handleOver.bind(this);
        this.handleSlide = this.handleSlide.bind(this);
        this.handleUnslide = this.handleUnslide.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (this.state.elapsed !== nextProps.currentSong.elapsed) {
            this.setState({
                elapsed: nextProps.currentSong.elapsed,
            });
            setTimeout(() => this.player.seekTo(this.state.elapsed), 50);
        }
    }

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
        this.handleNext(this.props.currentSong.song);
    }

    handlePlayPause() {
        if (this.props.currentSong.playing) { 
            this.props.pauseSong()
        } else {
            this.props.playSong();
        }
    }

    handleNext(currentSong) {
        if (this.props.player.shuffle) {
            this.songs = this.props.queue.shuffled;
        } else {
            this.songs = this.props.queue.unshuffled;
        }
        const currentSongPos = this.songs.map(song => song.id).indexOf(currentSong.id);
        switch (this.props.player.loop[0]) {
            case "off":
                if (currentSongPos - 1 < 0) {
                    this.props.setCurrentSong(null);
                    this.props.toggleQueueList();
                    return;
                }
                break;
            case "one":
                this.props.setCurrentSong(currentSong);
                this.props.playSong();
                return;
            case "all":
            default:
                break;
        }
        const nextSongPos = currentSongPos - 1 >= 0 ? currentSongPos - 1 : (this.props.player.loop ? this.songs.length + (currentSongPos - 1) : null)
        const nextSong = this.songs[nextSongPos];
        this.props.setCurrentSong(nextSong);
        this.props.playSong();
    }
    
    handlePrevious(currentSong) {
        if (this.props.player.shuffle) {
            this.songs = this.props.queue.shuffled;
        } else {
            this.songs = this.props.queue.unshuffled;
        }
        const currentSongPos = this.songs.map(song => song.id).indexOf(currentSong.id)
        let prevSongPos;
        if (currentSongPos + 1 < this.songs.length) {
            prevSongPos = currentSongPos + 1;
        } else {
            switch (this.props.player.loop[0]) {
                case "off":
                    prevSongPos = null;
                    break;
                case "all":
                    prevSongPos = 0;
                    break;
                case "one":
                    prevSongPos = currentSongPos;
            }
        }
        const prevSong = prevSongPos ? this.songs[prevSongPos] : null;
        this.props.setCurrentSong(prevSong);
        if (prevSong) this.props.playSong();
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
    
    showTime(secs) {
        let date = new Date(null);
        date.setSeconds(secs);
        return (
          date.toTimeString().slice(4, 8)
        );
    }

    renderLoopButton() {
        switch (this.props.player.loop[0]) {
            case "off":
                this.src = window.play_bar_loop;
                break;
            case "all":
                this.src = window.play_bar_loop_all;
                break;
            case "one":
                this.src = window.play_bar_loop_one;
                break;
            default:
                break;
        }
        return <img src={this.src} className="player-control" onClick={() => this.props.toggleLoop()}></img>
    }

    render() {
        if (this.props.currentSong.song) {
            return (
            <div className="player-bar-container">
                <div className="player-bar">
                    <ReactPlayer 
                        url={this.props.currentSong.song.audioURL}
                        controls={true}
                        ref={this.ref}
                        playing={this.props.currentSong.playing}
                        volume={this.state.volume}
                        muted={this.props.currentSong.muted}
                        width="0px"
                        height="0px"
                        onProgress={this.handleProgress}
                        onDuration={this.handleDuration}
                        onEnded={this.handleOver}
                    />
                    <div className="controls-container">
                        <img src={window.play_bar_previous} className="player-control" onClick={() => this.handlePrevious(this.props.currentSong.song)}></img>
                        <img src={this.props.currentSong.playing ? window.play_bar_pause : window.play_bar_play} className="player-control" onClick={() => this.handlePlayPause(this.props.currentSong.song)}></img>
                        <img src={window.play_bar_next} className="player-control" onClick={() => this.handleNext(this.props.currentSong.song)}></img>
                        <p className={this.props.player.shuffle ? "shuffled" : "shuffle"} onClick={() => this.props.toggleShuffle()}><i className="fas fa-random"></i></p>
                        {this.renderLoopButton()}
                    </div>
                    <div className="progress">
                        {this.showTime(Math.round(this.state.duration * this.state.elapsed))}
                    </div>
                    <div className="progress-tracker-container">
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
                    <div className="length">
                        {this.showTime(Math.round(this.state.duration))}
                    </div>
                    <img src={this.props.currentSong.muted ? window.volume_off : window.volume_on} className="player-control" onClick={() => this.props.currentSong.muted ? this.props.unmuteSong() : this.props.muteSong()}></img>
                    <div className="song-info-container">
                        <img src={this.props.currentSong.song.imageURL ? this.props.currentSong.song.imageURL : window.user_dp} ></img>
                        <div className="song-info">
                            <Link to={`/users/${this.props.currentSong.song.artist.id}`} className="artist">{this.props.currentSong.song.artist.username}</Link>
                            <Link to={`/songs/${this.props.currentSong.song.id}`} className="title">{this.props.currentSong.song.title.length < 41 ? this.props.currentSong.song.title : this.props.currentSong.song.title.slice(0,40)}</Link>
                        </div>
                    </div>
                    <div className="actions-container">
                        <img src={window.playlist} onClick={() => this.props.toggleQueueList()}></img>
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


