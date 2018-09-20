import React from "react";
import { FormGroup, ControlLabel, FormControl, Radio } from 'react-bootstrap';
import { Link } from "react-router-dom";

class UploadForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      genre: "",
      description: "",
      availability: true,
      audio: null,
      audioURL: "",
      image: "",
      imageURL: "",
      artistId: this.props.currentUser.id,
    };
  }

  getValidationState() {
    const titleLength = this.state.title.length;
    if (titleLength > 2) return "success";
    else if (titleLength > 0) return "error";
    else return null;
  }

  update(field) {
    debugger
    return (e) => {
      this.setState({ [field]: e.currentTarget.value });
    };
  }

  updateAvailability() {
    debugger
    return e => {
      const publicity = (e.currentTarget.value === "Public") ? true : false ;
      this.setState({
        availability: publicity,
      });
    };
  }

  handleImage(e) {
    const reader = new FileReader();
    const image = e.currentTarget.files[0];
    debugger
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
    songData.append('song[artist_id]', this.state.artistId);
    debugger
    this.props.submitAction(songData).then(
      (song) => this.props.history.push(`/songs/${song.id}`)
    );
    // () => this.props.history.push(`/${this.props.currentUser.username}/${this.state.title.split(" ").join("-")}`)
    // this.props.submitAction(song).then(() => this.setState({
    //   toShowPage: true,
    // }));
  }

  render () {
    const imagePreview = this.state.imageURL ? <img src={this.state.imageURL} className="song-image-preview" /> : null;
    return (
      <form className="upload-form-container" onSubmit={this.handleSubmit.bind(this)}>
        <div className="upload-form-header">
          <h2 className="upload-form-subheader">We can't wait for your jam!</h2>
          <br/>
          <div className="song-uploader-container">
            <FormGroup controlId="uploadFormAudio">
              <formControl type="file" />
            </FormGroup>
          </div>
        </div>

        <div className="upload-fill-in-form">
          <div className="upload-form-content">
            <div className="upload-form-left">
              {imagePreview}
              <input type="file" className="image-uploader" value="" accept=".jpg, .png" onChange={this.handleImage} />
            </div>
            <div className="upload-form-right">
              <FormGroup
                controlId="uploadFormTitle"
                validationState={this.getValidationState()}>
                <ControlLabel className="upload-form-data-name">Title</ControlLabel>
                <FormControl type="text"
                             value={this.state.title}
                             placeholder="Enter a title with minimum length of 3"
                             className="upload-form-title"
                             onChange={this.update("title")}
                />
              </FormGroup>
              <FormControl.Feedback />
              <FormGroup controlId="uploadFormGenre">
                <ControlLabel className="upload-form-data-name">Genre</ControlLabel>
                <FormControl componentClass="select" placeholder="None" className="upload-form-genre" onChange={this.update("genre")}>
                    <option value={this.state.genre}>Ambient</option>
                    <option value={this.state.genre}>Classical</option>
                    <option value={this.state.genre}>Country</option>
                    <option value={this.state.genre}>Dance</option>
                    <option value={this.state.genre}>Electronic</option>
                    <option value={this.state.genre}>Hip-hop</option>
                    <option value={this.state.genre}>Jazz</option>
                    <option value={this.state.genre}>Metal</option>
                    <option value={this.state.genre}>Piano</option>
                    <option value={this.state.genre}>Soul</option>
                    <option value={this.state.genre}>Rock</option>
                    <option value={this.state.genre}>World</option>
                </FormControl>
              </FormGroup>
              <FormGroup controlId="uploadFormDescription">
                <ControlLabel className="upload-form-data-name">Description</ControlLabel>
                <FormControl componentClass="textarea" placeholder="Description is optional." className="upload-form-description" onChange={this.update("description")} />
              </FormGroup>
              <FormGroup controlId="uploadFormAvailability" onChange={this.updateAvailability()}>
                <ControlLabel className="upload-form-data-name">Availability</ControlLabel>
                <Radio name="radioGroup" defaultChecked>
                  Public
                </Radio>
                <Radio name="radioGroup">
                  Private
                </Radio>
              </FormGroup>
            </div>
          </div>
          <div className="upload-form-footer">
            <div className="requirement-reminder">
              <p className="required-field">Required fields</p><span className="required-marker">*</span>
              {this.renderErrors()}
            </div>
            <div className="upload-form-buttons-container">
              <Link to="/stream" className="upload-form-end-buttons upload-cancel-button">Cancel</Link>
              <input type="submit" value="Upload" className="upload-form-end-buttons upload-form-submit-button" />
            </div>
          </div>
        </div>
      </form>
    );
  }


}

export default UploadForm;
