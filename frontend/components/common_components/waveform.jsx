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
    this.initializeWaveform = this.initializeWaveform.bind(this);
    this.onReady = this.onReady.bind(this);
    // this.onProgress = this.onProgress.bind(this);
    // this.onSeek = this.onSeek.bind(this);
  }
  
  componentDidMount() {
    // const ctx = document.createElement("waveform").getContext("2d");
    // const gradient = ctx.createLinearGradient(0, 50, 0, 200);
    // gradient.addColorStop(0.5, 'white');
    // gradient.addColorStop(0.5, '#999');
    this.initializeWaveform();
    this.waveform.load(this.props.onPageSong.audioURL);
    // this.waveform.on("loading", (loaded) => {
      //   document.getElementById("banner-player-waveform-progress").value = loaded / 100;
      // });
    this.waveform.on("ready", this.onReady());
      // this.waveform.on("audioprocess", this.onProgress());
      // this.waveform.on("seek", this.onSeek());
      
  }
  
  initializeWaveform() {
    if (this.props.klass === "waveform") {
      this.waveform = WaveSurfer.create({
        container: "#waveform",
        waveColor: "#999",
        progressColor: "#FF5400",
        // width: 820,
        height: 150,
        barWidth: 2,
        normalize: true, // normalize by the maximum peak instead of 1.0
        interact: true, // whether the mouse interaction will be enabled at initialization
        responsive: true, // resize the waveform when the window is resized
        fillParent: true, // ignore container's size
        // maxCanvasWidth: 820,
      });
    }
  }
    
  onReady() {
    // document.getElementById('progwress').style.display = 'none';
    this.waveform.setMute(true);
    debugger
    if (this.props.currentSong.song && this.props.onPageSongId === this.props.currentSong.song.id) {
      debugger
      this.setState({
        playing: this.props.currentSong.playing,
        elapsed: this.props.currentSong.elapsed,
      });
      this.waveform.seekTo(this.state.elapsed);
      this.state.playing ? this.waveform.play() : this.waveform.pause();
    } else {
      debugger
      this.setState({
        playing: false,
        elapsed: 0,
      });
      this.waveform.seekTo(this.state.elapsed);
    } 
    
  }

  // onProgress() {
  //   debugger
  //   if (this.props.currentSong.song && this.props.onPageSongId === this.props.currentSong.song.id && this.state.elapsed !== this.props.currentSong.elpased) {
  //     debugger
  //     this.setState({
  //       elapsed: this.props.currentSong.elapsed,
  //     });
  //     this.waveform.seekTo(this.state.elapsed);
  //   }
  //   // if (!this.props.currentSong.song) {
  //   //   this.setState = ({
  //   //     elapsed: 0,
  //   //   });
  //   //   this.waveform.seekTo(this.state.elapsed);
  //   // }
  // }

  // onSeek(time) {
  //   // debugger
  //   if (this.props.currentSong.song && this.props.onPageSongId === this.props.currentSong.song.id) {
  //     this.setState({
  //       elapsed: time,
  //     })
  //     this.props.setElapsedTo(this.state.elapsed);
  //   }
  // }


  componentWillReceiveProps(nextProps) {
    debugger
    if (this.props.onPageSongId === nextProps.currentSong.song.id && nextProps.currentSong.playing) {
      this.waveform.play();
    } else {
      this.waveform.pause();
    }
    if (this.props.onPageSongId === nextProps.currentSong.song.id &&
        this.props.currentSong.elapsed !== nextProps.currentSong.elapsed) {
      this.waveform.seekTo(nextProps.currentSong.elapsed);
    }
  }

  componentWillUnmount() {
    this.waveform.destroy();
  }

  render() {
    return (
      <div id="waveform">
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
