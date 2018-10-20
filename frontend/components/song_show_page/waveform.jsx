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
        // currentSong: state.ui.currentSong,
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
    this.state = {
      playing: null,
      elapsed: null,
    };
    this.onReady = this.onReady.bind(this);
    this.onProgress = this.onProgress.bind(this);
  }

  componentDidMount() {
    // const ctx = document.createElement("waveform").getContext("2d");
    // const gradient = ctx.createLinearGradient(0, 50, 0, 200);
    // gradient.addColorStop(0.5, 'white');
    // gradient.addColorStop(0.5, '#999');
    this.waveform = WaveSurfer.create({
      container: "#banner-player-waveform",
      waveColor: "#999",
      progressColor: "#FF5400",
      // width: 820,
      height: 150,
      barWidth: 2,
      normalize: true, // normalize by the maximum peak instead of 1.0
      interact: true, // Whether the mouse interaction will be enabled at initialization
      responsive: true, // resize the waveform when the window is resized
      fillParent: true, // ignore container's size
      // maxCanvasWidth: 820,
    });
    this.waveform.load(this.props.onPageSong.audioURL);
    // this.waveform.on("loading", (loaded) => {
    //   document.getElementById("banner-player-waveform-progress").value = loaded / 100;
    // });
    this.waveform.on("ready", this.onReady());
    this.waveform.on("audioprocess", this.onProgress());
    // this.waveform.on("seek", )
    
  }

  onReady() {
    // document.getElementById('progress').style.display = 'none';
    this.waveform.setMute(true);
    debugger
    if (!this.props.currentSong.song) {
      this.setState = ({
        elapsed: 0,
      });
      this.waveform.seekTo(this.state.elapsed);
    } else if (this.props.onPageSongId === this.props.currentSong.song.id) {
      this.setState = ({
        playing: this.props.currentSong.playing,
        elapsed: this.props.currentSong.elapsed,
      });
      this.waveform.seekTo(this.state.elapsed);
      this.state.playing ? this.waveform.play() : this.waveform.pause();
    }
  }

  onProgress() {
    if (!this.props.currentSong.song) {
      this.setState = ({
        elapsed: 0,
      });
      this.waveform.seekTo(this.state.elapsed);
    } else if (this.props.onPageSongId === this.props.currentSong.song.id && this.state.elapsed !== this.props.currentSong.elpased) {
      this.setState = ({
        elapsed: this.props.currentSong.elapsed,
      });
      this.waveform.seekTo(this.state.elapsed);
    }
  }

  onSeek() {

  }

  // componentDidMount() {
    // this.waveform = WaveSurfer.create({
    //   container: "#banner-player-waveform",
    //   waveColor: "#999",
    //   progressColor: "#FF5400",
    //   // width: 820,
    //   height: 150,
    //   barWidth: 2,
    //   normalize: true, // normalize by the maximum peak instead of 1.0
    //   interact: true, // Whether the mouse interaction will be enabled at initialization
    //   responsive: true, // resize the waveform when the window is resized
    //   fillParent: true, // ignore container's size
    //   // maxCanvasWidth: 820,
    // });
    // this.waveform.load(this.props.onPageSong.audioURL);
    // this.waveform.setMute(true);
    // const buttons = {
    //   play: document.getElementById("banner-player-play-sign"),
    //   pause: document.getElementById("banner-player-pause-sign"),
    // };



    // buttons.play.addEventListener("click", () => {
    //   waveformBar.play();
      // buttons.play.disabled = true;
      // buttons.pause.disabled = false;
      // buttons.stop.disabled = false;
    // });

    // buttons.pause.addEventListener("click", () => {
      // waveformBar.pause();
      // buttons.play.disabled = false;
      // buttons.pause.disabled = true;
      // buttons.stop.disabled = false;
    // });

    // buttons.stop.addEventListener("click", () => {
      // waveformBar.stop();
      // buttons.play.disabled = false;
      // buttons.pause.disabled = true;
      // buttons.stop.disabled = true;
    // });

    // waveformBar.on("ready", () => {
      // buttons.play.disabled = false;
    // });

    // window.addEventListener("resize", () => {
      // const currentProgress = waveformBar.getCurrentTime() / waveformBar.getDuration();
      // waveformBar.empty();
      // waveformBar.drawBuffer();
      // waveformBar.seekTo(currentProgress);
      // buttons.play.disabled = false;
      // buttons.pause.disabled = true;
      // buttons.stop.disabled = false;
    // }, false);
  // }

  render() {
    return (
      <div id="banner-player-waveform">
        {/* <progress id="progress" className="banner-player-waveform-progress" value="0" max="1"></progress> */}
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
