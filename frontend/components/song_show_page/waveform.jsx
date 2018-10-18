import React from "react";
import WaveSurfer from "wavesurfer.js";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { fetchSongs } from "../../actions/song_actions";
import { setCurrentSong, playSong, pauseSong, setElapsedTo, muteSong, unmuteSong } from "../../actions/current_song_actions";
import { latest, shuffle } from "../../util/song_api_util";

const msp = (state) => {
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
        playSong: () => dispatch(playSong()),
        pauseSong: () => dispatch(pauseSong()),
        setElapsedTo: (time) => dispatch(setElapsedTo(time)),
        muteSong: () => dispatch(muteSong()),
        unmuteSong: () => dispatch(unmuteSong()),
    });
}


// const mdp = (dispatch) => {
//   return {
//   };
// };


class Waveform extends React.Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   song: null,
    //   playing: null,
    //   pos: null,
    // };
    this.onReady = this.onReady.bind(this);
  }

  componentDidMount() {
    const ctx = document.createElement("waveform").getContext("2d");
    const gradient = ctx.createLinearGradient(0, 50, 0, 200);
    gradient.addColorStop(0.5, 'white');
    gradient.addColorStop(0.5, '#999');
    this.waveform = WaveSurfer.create({
      container: "banner-player-waveform",
      waveColor: gradient,
      progressColor: "#FF5400",
      // width: 820,
      height: 75,
      barWidth: 2,
      normalize: true, // normalize by the maximum peak instead of 1.0
      interact: true, // Whether the mouse interaction will be enabled at initialization
      responsive: true, // resize the waveform when the window is resized
    });
    this.waveform.load(this.props.onPageSong.audioURL);
    this.waveform.on("loading", (loaded) => {
      document.getElementById("banner-player-waveform-progress").value = loaded / 100;
    });
    this.waveform.on("ready", this.onReady());
    // this.waveform.on("seek", )
    
  }

  onReady() {
    document.getElementById('progress').style.display = 'none';
    this.waveform.setMute(true);
    if (this.props.onPageSong.id === this.props.currentSong.song.id) {
      this.waveform.seekTo(this.props.currentSong.elapsed);
      this.props.currentSong.playing ? this.waveform.play() : this.waveform.pause();
    } else {
      this.waveform.seekTo(0);
    }
  }

  // componentDidMount() {
  //   const barCtx = document.getElementById("waveform-player").getContext("2d");
  //   const barBase = barCtx.createLinearGradient(0, 75, 0, 25);
  //   barBase.addColorStop(0, "#f7ba0f");
  //   barBase.addColorStop(1, "#f7530f");
  //   const waveformBar = WaveSurfer.create({
  //     container: "#waveform-player",
  //     wavecolor: barBase,
  //     progressColor: "white",
  //     barWidth: 2,
  //   });
  //   const buttons = {
  //     play: document.getElementById("play-button"),
  //     pause: document.getElementById("pause-button"),
  //     stop: document.getElementById("stop-button"),
  //   };

  //   buttons.play.addEventListener("click", () => {
  //     waveformBar.play();
  //     buttons.play.disabled = true;
  //     buttons.pause.disabled = false;
  //     buttons.stop.disabled = false;
  //   });

  //   buttons.pause.addEventListener("click", () => {
  //     waveformBar.pause();
  //     buttons.play.disabled = false;
  //     buttons.pause.disabled = true;
  //     buttons.stop.disabled = false;
  //   });

  //   buttons.stop.addEventListener("click", () => {
  //     waveformBar.stop();
  //     buttons.play.disabled = false;
  //     buttons.pause.disabled = true;
  //     buttons.stop.disabled = true;
  //   });

  //   waveformBar.on("ready", () => {
  //     buttons.play.disabled = false;
  //   });

  //   window.addEventListener("resize", () => {
  //     const currentProgress = waveformBar.getCurrentTime() / waveformBar.getDuration();
  //     waveformBar.empty();
  //     waveformBar.drawBuffer();
  //     waveformBar.seekTo(currentProgress);
  //     buttons.play.disabled = false;
  //     buttons.pause.disabled = true;
  //     buttons.stop.disabled = false;
  //   }, false);

  //   waveformBar.load(this.props.song.audioURL);
  // }

  render() {
    return (
      <div id="banner-player-waveform">
        <progress id="progress" className="banner-player-waveform-progress" value="0" max="1"></progress>
      </div>
    );
  }

};

export default withRouter(connect(msp, mdp)(Waveform));

  // togglePlaying() {
  //   this.setState({
  //     playing: !this.state.playing,
  //   });
  // }
  //
  // jump() {
  //   return (e) => {
  //     this.setState({
  //       at: e.originalArgs[0], //??
  //     });
  //   };
  // }
