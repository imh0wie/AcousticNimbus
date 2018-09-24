import React from "react";

class NewestListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playing: false,
    };
    this.toggleButton = this.toggleButton.bind(this);
  }

  toggleButton () {
    return (e) => {
      this.setState({ playing: !this.state.playing });
    };
  }

  renderPlayPause() {
    if (this.state.playing) {
      return <img src={window.pause_button} className="newest-list-item-play-pause-button" onClick={this.toggleButton} />;
    } else {
      return <img src={window.play_button} className="newest-list-item-play-pause-button" onClick={this.toggleButton} />;
    }
  }

  render() {
    return(
      <li className="newest-list-item-info-container">
        <img src={this.props.song.imageURL} className="newest-list-item-image" />
        {this.renderPlayPause}
        <div className="newest-list-item-main-info">
          <p className="newest-list-item-artist">{this.props.song.artist}</p>
          <p className="newest-list-item-title">{this.props.song.title}</p>
        </div>
        <div className="newest-list-item-posted-date-container">
          <p className="newest-list-item-posted-date">{this.props.song.created_at}</p>
        </div>
      </li>
    );
  }
}

export default NewestListItem;
