import React from "react";
import { Link, withRouter } from "react-router-dom";

class uploadForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      genre: "",
      description: "",
      availability: true,
      audio: "",
      audioURL: "",
      image: "",
      imageURL: "",
      artist_id: this.props.currentUser.id,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleAudio = this.handleAudio.bind(this);
    this.handleImage = this.handleImage.bind(this);
    // toShowPage: false,
  }
  // If more states are created later, need to modify handleSubmit
  // with formData.
  update(field) {
    return e => {
      this.setState({
        [field]: e.currentTarget.value,
      });
    };
  }

  handleSubmit(e) {
    e.preventDefault();
    let songData = new FormData();
    songData.append('song[title]', this.state.title);
    songData.append('song[genre]', this.state.genre);
    songData.append('song[description]', this.state.description);
    songData.append('song[availability]', this.state.availability);
    songData.append('song[audio]', this.state.audio);
    songData.append('song[audio_url]', this.state.audioURL);
    songData.append('song[image]', this.state.image);
    songData.append('song[image_url]', this.state.imageURL);
    songData.append('song[artist_id]', this.state.artist_id);
    debugger
    this.props.submitAction(songData).then(
      (song) => this.props.history.push(`/songs/${song.id}`)
    );
    // () => this.props.history.push(`/${this.props.currentUser.username}/${this.state.title.split(" ").join("-")}`)
    // this.props.submitAction(song).then(() => this.setState({
    //   toShowPage: true,
    // }));
  }


  handleAudio(e) { //add specific rendering on load
    const reader = new FileReader();
    const audio = e.currentTarget.files[0];

    reader.onloadend = () => {
      this.setState({
        audio: audio,
        audioURL: reader.result,
      });
      debugger
    };
    // audio.addEventListener('loadend', () => this.setState({
    //   audio: audio,
    //   audioURL: reader.result,
    // }));

    // reader.readAsDataURL(audio).then(() => this.setState({
    //   audio: audio,
    //   audioURL: reader.result,
    // }));
    // if (audio) {
    //   reader.readDataAsURL(audio);
    // }
  }

  // Create URL here instead of in controller(?)
  handleImage(e) {
    const reader = new FileReader();
    const image = e.currentTarget.files[0];
    reader.onloadend = () => {
        this.setState({
        image: image,
        imageURL: reader.result,
      });
    };
    if (image) {
      reader.readAsDataURL(image);
    }
  }

  updateAvailability() {
    return e => {
      const publicity = (e.currentTarget.value === "Public") ? true : false ;
      this.setState({
        availability: publicity,
      });
    };
  }

  updateGenre() {
    return e => {
      this.setState({
        genre: e.currentTarget.value,
      });
    };
  }

  renderErrors() {
    const errors = this.props.errors || [];
    return (
      <ul>
        {errors.map( (error, i) => {
          return (
            <li key={`error${i}}`}>{error}</li>
          );
        })}
      </ul>
    );
  }

  render() {
    const imagePreview = this.state.imageURL ? <img src={this.state.imageURL} className="song-image-preview" /> : null;
    const audioPreview = () => {
      if (this.state.audioURL) {
        return(
          <audio controls>
            <source src={this.state.audioURL} />
          </audio>
        );
      } else {
        return null;
      }
    };
    return(
      <div className="upload_form_wrapper">
        <form className="upload-form" onSubmit={this.handleSubmit}>
          <div className="upload-form-header">
            <h2 className="upload-form-subheader">We can't wait for your jam!</h2>
            <br/>
            <div className="song-uploader-container">
              <input type="file" className="audio-uploader" value="" accept=".mp3, .wav" onChange={this.handleAudio} />
              {audioPreview}
            </div>
          </div>
          <div className="upload-form-box">
            <div className="upload-form-content">

              <div className="upload-form-fill-blank">
                <div className="upload-form-errors-container">
                  {this.renderErrors()}
                </div>
                <div className="upload-form-title-input-container">
                  <label>
                    <div className="upload-form-data-name">
                      Title<span className="required-marker">*</span>
                    </div>
                    <input type="text"
                           value={this.state.title}
                           placeholder="Name your song"
                           onChange={this.update("title")}
                           className="upload-form-title-input" />
                  </label>
                </div>
                <br/>
                <div className="upload-form-genre-input-container">
                  <label>
                    <div className="upload-form-data-name">
                      Genre
                    </div>
                    <select className="upload-form-genre-input">
                      <option value={this.state.genre} onChange={this.update("genre")}>Ambient</option>
                      <option value={this.state.genre} onChange={this.update("genre")}>Classical</option>
                      <option value={this.state.genre} onChange={this.update("genre")}>Country</option>
                      <option value={this.state.genre} onChange={this.update("genre")}>Dance & EDM</option>
                      <option value={this.state.genre} onChange={this.update("genre")}>Electronic</option>
                      <option value={this.state.genre} onChange={this.update("genre")}>Hip-hop & Rap</option>
                      <option value={this.state.genre} onChange={this.update("genre")}>Jazz & Blues</option>
                      <option value={this.state.genre} onChange={this.update("genre")}>Metal</option>
                      <option value={this.state.genre} onChange={this.update("genre")}>Piano</option>
                      <option value={this.state.genre} onChange={this.update("genre")}>R&B & Soul</option>
                      <option value={this.state.genre} onChange={this.update("genre")}>Rock</option>
                      <option value={this.state.genre} onChange={this.update("genre")}>World</option>
                    </select>
                  </label>
                </div>
                <div className="upload-form-description-input-container">
                  <label>
                    <div className="upload-form-data-name">
                      Description
                    </div>
                    <textarea placeholder="Description is optional" className="upload-form-description-input" onChange={this.update("description")}></textarea>
                  </label>
                </div>
                <div className="upload-form-availability-input-container">
                  <label>
                    <div className="upload-form-data-name">
                      Availability
                    </div>
                    <input type="radio" name="answer" value={this.state.availability} className="upload-form-availability-input" onChange={this.updateAvailability} />Public<br/>
                    <input type="radio" name="answer" value={this.state.availability} className="upload-form-availability-input" onChange={this.updateAvailability} />Private<br/>
                  </label>
                </div>
              </div>
            </div>
            <div className="upload-form-footer">
              <div className="requirement-reminder">
                <p className="required-field">Required fields</p><span className="required-marker">*</span>
              </div>
              <div className="upload-form-buttons-container">
                <Link to="/stream" className="upload-form-end-buttons upload-cancel-button">Cancel</Link>
                <input type="submit" value="Upload" className="upload-form-end-buttons upload-form-submit-button" />
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default withRouter(uploadForm);
