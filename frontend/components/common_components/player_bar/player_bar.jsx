import React from "react";
import ReactPlayer from "react-player";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import { fetchSongs } from "../../../actions/song_actions";
import { fetchLikes, createLike, removeLike } from "../../../actions/like_actions";
import { setCurrentSong, playSong, pauseSong, setElapsedTo, muteSong, unmuteSong } from "../../../actions/current_song_actions";
import { openModal } from "../../../actions/modal_actions";
import { latest, shuffle } from "../../../util/song_api_util";
import { likeOf } from "../../../util/like_api_util";

const msp = (state) => {
    const songId = state.ui.currentSong.song ? state.ui.currentSong.song.id : null;
    return {
        latestTwelve: latest(12, state.entities.songs),
        latestTwenty: latest(20, state.entities.songs),
        shuffled: shuffle(12, state.entities.songs),
        likes: state.entities.likes,
        currentSong: state.ui.currentSong,
        currentUser: state.entities.users[state.session.id],
        currentLike: likeOf("Song", songId, state.session.id, state.entities.likes),
    }
}

const mdp = (dispatch) => {
    return ({
        fetchSongs: () => dispatch(fetchSongs()),
        fetchLikes: () => dispatch(fetchLikes()),
        createLike: (like) => dispatch(createLike(like)),
        removeLike: (id) => dispatch(removeLike(id)),
        setCurrentSong: (song) => dispatch(setCurrentSong(song)),
        playSong: () => dispatch(playSong()),
        pauseSong: () => dispatch(pauseSong()),
        setElapsedTo: (time) => dispatch(setElapsedTo(time)),
        muteSong: () => dispatch(muteSong()),
        unmuteSong: () => dispatch(unmuteSong()),
        openModal: (modal) => dispatch(openModal(modal)),
    });
}

class PlayerBar extends React.Component {
    constructor(props) {
        super(props);
        this.repeat = ["none", "all", "single"];
        this.state = {
            elapsed: this.props.currentSong.elapsed,
            sliding: false,
            // muted: false,
            duration: null,
            volume: 0.60,
            shuffle: false,
            loop: this.repeat[0],
        };
        this.ref = this.ref.bind(this);
        this.renderPlayPauseButton = this.renderPlayPauseButton.bind(this);
        this.renderVolume = this.renderVolume.bind(this);
        this.handleProgress = this.handleProgress.bind(this);
        this.handleDuration = this.handleDuration.bind(this);
        this.handleOver = this.handleOver.bind(this);
        this.handlePlayPause = this.handlePlayPause.bind(this);
        this.handlePrevious = this.handlePrevious.bind(this);
        this.handleNext = this.handleNext.bind(this);
        this.handleShuffle = this.handleShuffle.bind(this);
        this.handleLoop = this.handleLoop.bind(this);
        this.handleLike = this.handleLike.bind(this);
        this.showTime = this.showTime.bind(this);
        this.handleSlide = this.handleSlide.bind(this);
        this.handleUnslide = this.handleUnslide.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    // componentWillReceiveProps() {
    //     debugger
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
        this.handleNext(this.props.currentSong.song);
    }

    handlePlayPause() {
        if (this.props.currentSong.playing) { 
            this.props.pauseSong()
        } else {
            this.props.playSong();
        }
    }

    handlePrevious(currentSong) {
        let songs = this.props.latestTwelve;
        if (this.state.shuffle) {
            songs = this.props.shuffled;
        }
        const songsIdx = songs.map((s, i) => i);
        let currentSongIdx = songsIdx.find((idx) => {
            const song = songs[idx];
            return song.id === currentSong.id
        });
        const nextSongIdx = (currentSongIdx - 1) < 0 ? songs.length - 1 : currentSongIdx - 1;
        const nextSong = songs[nextSongIdx];
        this.props.setCurrentSong(nextSong);
        this.props.playSong();
    }
    
    handleNext(currentSong) {
        let songs = this.props.latestTwelve;
        if (this.state.shuffle) {
            songs = this.props.shuffled;
        }
        const songsIdx = songs.map((s, i) => i);
        let currentSongIdx = songsIdx.find((idx) => {
            const song = songs[idx];
            return song.id === currentSong.id
        });
        const nextSongIdx = (currentSongIdx + 1) === songs.length ? 0 : currentSongIdx + 1;
        const nextSong = songs[nextSongIdx];
        this.props.setCurrentSong(nextSong);
        this.props.playSong();
    }

    handleShuffle() {
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

    handleVolume() {
        if (this.props.currentSong.muted) {
            this.props.unmuteSong();
        } else {
            this.props.muteSong();
        }
    }

    handleLike() {
        if (this.props.currentUser) {
            if (this.props.currentLike) {
                this.props.removeLike(this.props.currentLike.id);
            } else {
                const like = {
                    likeable_type: "Song",
                    likeable_id: this.props.currentSong.song.id,
                    liker_id: this.props.currentUser.id,
                }
                debugger
                this.props.createLike(like);
            }
        } else {
            this.props.openModal("signup");
        }
    }

    renderPlayPauseButton() {
        if (this.props.currentSong.playing) {
            return (
                <img src={window.play_bar_pause} className="player-control" 
                // onChange={() => this.handlePlayPause(this.props.currentSong)}
                onClick={() => this.handlePlayPause(this.props.currentSong.song)}>
                </img>
            );
        } else {
            return (
                <img src={window.play_bar_play} className="player-control" 
                // onChange={() => this.handlePlayPause(this.props.currentSong)}
                onClick={() => this.handlePlayPause(this.props.currentSong.song)}>
                </img>
            );
        }
    }

    renderVolume() {
        if (this.props.currentSong.muted) {
            return (
                <img src={window.volume_off} className="player-control" onClick={() => this.handleVolume()}>
                </img>
            );
        } else {
            return (
                <img src={window.volume_on} className="player-control" onClick={() => this.handleVolume()}>
                </img>
            );
        }
    }

    render(){
    if (this.props.currentSong.song) {
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
                    muted={this.props.currentSong.muted}
                    width="0px"
                    height="0px"
                    onProgress={this.handleProgress}
                    onDuration={this.handleDuration}
                    onEnded={this.handleOver}
                />
                <div className="controls-container">
                    <img src={window.play_bar_previous} className="player-control" onClick={() => this.handlePrevious(this.props.currentSong.song)}></img>
                    {this.renderPlayPauseButton()}
                    <img src={window.play_bar_next} className="player-control" onClick={() => this.handleNext(this.props.currentSong.song)}></img>
                    <p className={this.state.shuffle ? "shuffled" : "shuffle"} onClick={() => this.handleShuffle()}><i class="fas fa-random"></i></p>
                    <img src={window.play_bar_loop} className="player-control" onClick={() => this.handleLoop()}></img>
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
                <img src={this.props.currentSong.muted ? window.volume_off : window.volume_on} className="player-control" onClick={() => this.handleVolume()}></img>
                <div className="song-info-container">
                    <img src={this.props.currentSong.song.imageURL ? this.props.currentSong.song.imageURL : window.user_dp} ></img>
                    <div className="song-info">
                        <Link to="" className="artist">{this.props.currentSong.song.artist}</Link>
                        <Link to={`/songs/${this.props.currentSong.song.id}`} className="title">{this.props.currentSong.song.title.length < 41 ? this.props.currentSong.song.title : this.props.currentSong.song.title.slice(0,40)}</Link>
                    </div>
                </div>
                <div className="actions-container">
                    <p className={this.props.currentLike ? "liked" : "like"}><i className="fas fa-heart" onClick={() => this.handleLike()}></i></p>
                    <img src={window.playlist}></img>
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
//<img src={window.play_bar_shuffle} className="player-control" onClick={() => this.handleShuffle()}></img>
//<p></p>
export default withRouter(connect(msp, mdp)(PlayerBar));


