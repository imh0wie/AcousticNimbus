import React from "react";
import WaveformPlayer from "./waveform_player/waveform_player";

class SongShowPage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    debugger
    return (
      <div className="show-page-container">
        <div className="banner-player-container">
          <WaveformPlayer song={this.props.song} />
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
