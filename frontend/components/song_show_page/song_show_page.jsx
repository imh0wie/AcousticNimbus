import React from "react";
import WaveSurfer from "wavesurfer.js";
// import SongShowPageContentContainer from "../song_show_page_content/song_show_page_content_container";
class SongShowPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      song: null,
      playing: null,
      pos: null,
    };
    this.jump = this.jump.bind(this);
  }

  togglePlaying() {
    this.setState({
      playing: !this.state.playing,
    });
  }

  jump() {
    return (e) => {
      this.setState({
        at: e.originalArgs[0], //??
      });
    };
  }

  componentDidMount() {

  }

  render() {
    return (
      <div className="show-page-container">
        <div className="banner-player-container">
          <div id="waveform">
          </div>
        </div>
        <h1>{this.props.song.title}</h1>
        <h1>{this.props.song.genre}</h1>
        <h1>{this.props.song.description}</h1>
        <h1>{this.props.song.availability}</h1>
      </div>
    );
  }
}

// <audio controls>
//   <source src="https://s3.amazonaws.com/acoustic-nimbus-fileupload-dev/AP6j3EYT7GuzuYYTtYobA5sw" type="audio/mpeg" />
// </audio>
export default SongShowPage;

// waveformPlayer () {
//   let barsCtx = document.createElement('canvas').getContext('2d');
//   let barsBase = barsCtx.createLinearGradient(0, 75, 0, 25);
//   barsBase.addColorStop(0, "#f7ba0f");
//   barsBase.addColorStop(1, "#f7530f");
//   barsCtx.fillStyle = barBase;
//   barsCtx.fillRect(0, 0, 100, 100);
//   return (
//     WaveSurfer.create({
//
//     });
//   );
// }
