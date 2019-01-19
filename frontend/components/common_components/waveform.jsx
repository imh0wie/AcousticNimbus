import React from "react";
import WaveSurfer from "wavesurfer.js";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { setElapsedTo} from "../../actions/current_song_actions";

const msp = (state) => {
  return {
    currentSong: state.ui.currentSong,
  };
}

const mdp = (dispatch) => {
  return ({
    setElapsedTo: (time) => dispatch(setElapsedTo(time)),
  });
}

class Waveform extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      playing: null,
      elapsed: null,
    };
    this.listStyle = {
      height: "100%",
      marginBottom: "20px",
      zIndex: "1",
    };
    this.indStyle = {
      zIndex: "1",
    }
  }
  
  componentDidMount() {
    this.initializeWaveform();
    this.waveform.load(this.props.song.audioURL);
    this.waveform.on("ready", () => this.onReady());
    this.waveform.on("seek", (time) => this.onSeek(time));
    this.setState({
      loaded: true
    });
  }
  
  initializeWaveform() {
    switch (this.props.klass) {
      case "banner-player":
        this.waveform = WaveSurfer.create({
          container: "#waveform",
          waveColor: "hsla (200, 100%, 30%, 0.5)",
          progressColor: "#FF5400",
          height: 150,
          barWidth: 1,
          normalize: true, // normalize by the maximum peak instead of 1.0
          interact: true, // whether the mouse interaction will be enabled at initialization
          responsive: true, // resize the waveform when the window is resized
          fillParent: true, // ignore container's size
        });
        break;
      case "item-player":
        this.waveform = WaveSurfer.create({
          container: `#waveform${this.props.songId}`,
          waveColor: "grey",
          progressColor: "#FF5400",
          height: 60,
          barWidth: 1,
          normalize: true, // normalize by the maximum peak instead of 1.0
          interact: true, // whether the mouse interaction will be enabled at initialization
          responsive: true, // resize the waveform when the window is resized
          fillParent: true, // ignore container's size
        });
        break;
    }
  }
    
  onReady() {
    this.waveform.setMute(true);
    if (this.props.currentSong.song && this.props.songId === this.props.currentSong.song.id) {
      this.setState({
        playing: this.props.currentSong.playing,
        elapsed: this.props.currentSong.elapsed,
      });
      this.state.playing ? this.waveform.play() : this.waveform.pause();
      this.waveform.seekTo(this.state.elapsed);
    } else {
      this.setState({
        playing: false,
        elapsed: 0,
      });
      this.waveform.seekTo(this.state.elapsed);
    }
  }
  
  onSeek(time) {
    if (this.props.currentSong.song && this.props.songId === this.props.currentSong.song.id && this.state.elapsed !== time) {
      setTimeout(() => this.props.setElapsedTo(time), 200);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.currentSong.song && this.props.songId === nextProps.currentSong.song.id) {
      if (this.state.elapsed !== nextProps.currentSong.elapsed) {
        this.setState({
          elapsed: nextProps.currentSong.elapsed,
        })
        setTimeout(() => this.waveform.seekTo(this.state.elapsed), 100);
      }
    } else {
      this.setState({
        elapsed: 0,
        playing: false,
      });
      setTimeout(() => this.waveform.seekTo(this.state.elapsed), 200);
    }
  }

  componentWillUnmount() {
    this.waveform.destroy();
  }

  render() {
    return (
      <div id={this.props.klass === "banner-player" ? "waveform" : `waveform${this.props.songId}`} style={this.props.klass === "item-player" ? this.listStyle : this.indStyle}>
      </div>
    );
  }

};

export default withRouter(connect(msp, mdp)(Waveform));