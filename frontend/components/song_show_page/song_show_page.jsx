import React from "react";
import WaveSurfer from "wavesurfer.js";
// import SongShowPageContentContainer from "../song_show_page_content/song_show_page_content_container";
class SongShowPage extends React.Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   song: null,
    //   playing: null,
    //   pos: null,
    // };
    // this.jump = this.jump.bind(this);
  }

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

  componentDidMount() {
    const barCtx = document.createElement('canvas').getContext('2d');
    const barBase = barCtx.createLinearGradient(0, 75, 0, 25);
    barBase.addColorStop(0, "#f7ba0f");
    barBase.addColorStop(1, "#f7530f");
    const waveformBar = WaveSurfer.create({
      container: "#waveform-bar",
      wavecolor: barBase,
      progressColor: "white",
      barWidth: 2,
    });
    const buttons = {
      play: document.getElementById("play-button"),
      pause: document.getElementById("pause-button"),
      stop: document.getElementById("stop-button"),
    };

    buttons.play.addEventListener("click", () => {
      waveformBar.play();
      buttons.play.disabled = true;
      buttons.pause.disabled = false;
      buttons.stop.disabled = false;
    });

    buttons.pause.addEventListener("click", () => {
      waveformBar.pause();
      buttons.play.disabled = false;
      buttons.pause.disabled = true;
      buttons.stop.disabled = false;
    });

    buttons.stop.addEventListener("click", () => {
      waveformBar.stop();
      buttons.play.disabled = false;
      buttons.pause.disabled = true;
      buttons.stop.disabled = true;
    });

    waveformBar.on("ready", () => {
      buttons.play.disabled = false;
    });

    window.addEventListener("resize", () => {
      const currentProgress = waveformBar.getCurrentTime() / waveformBar.getDuration();
      waveformBar.empty();
      waveformBar.drawBuffer();
      waveformBar.seekTo(currentProgress);
      buttons.play.disabled = false;
      buttons.pause.disabled = true;
      buttons.stop.disabled = false;
    }, false);

    waveformBar.load(this.props.song.audioURL);
  }

  render() {
    debugger
    return (
      <div className="show-page-container">
        <div className="banner-player-container">
          <div id="waveform-bar">
          </div>
          <input type="button" id="play-button" value="Play" disabled="disabled" />
          <input type="button" id="pause-button" value="Pause" disabled="disabled" />
          <input type="button" id="stop-button" value="Stop" disabled="disabled" />
        </div>
      </div>
    );
  }
}

// {this.props.song.title}
// {this.props.song.genre}
// {this.props.song.description}
// {this.props.song.availability}
// <audio controls>
//   <source src="https://s3.amazonaws.com/acoustic-nimbus-fileupload-dev/AP6j3EYT7GuzuYYTtYobA5sw" type="audio/mpeg" />
// </audio>
export default SongShowPage;
