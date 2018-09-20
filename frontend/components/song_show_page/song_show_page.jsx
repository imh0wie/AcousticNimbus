import React from "react";
import { connect } from "react-redux";
import ReactAudioPlayer from "react-audio-player"
import SongShowPageContentContainer from "../song_show_page_content/song_show_page_content"
// import SongShowPageContentContainer from "../song_show_page_content/song_show_page_content_container";

class SongShowPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      song: {
        id: null,
        title: null,
        genre: null,
        audio_url: null,
        image_url: null,
        artist: null,
      },
      playing: false,
    };
  }

  render() {
    return (
      <div className="show-page-container">
        <div className="banner-player-container">
          <div id="waveform">
            <ReactAudioPlayer src={this.state.audioURL} className="upload-audio-preview" controls />
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
export default connect(msp)(SongShowPage);

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
