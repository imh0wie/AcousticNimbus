import React from "react";
import { Link, withRouter } from "react-router-dom";
import { merge } from "lodash";

class uploadForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: null,
      genre: null,
      description: null,
      availability: true,
    };
  }

  handleSubmit(e) {
    e.preventDefault();
    const user = merge({}, this.state);
    this.props.submitAction(user);
  }

  update(field) {
    return e => this.setState({
      [field]: e.currentTarget.value,
    });
  }

  renderErrors() {
    return (
      <ul>
        {this.props.errors.map( (error, i) => {
          return (
            <li key={`error${i}}`}>{error}</li>
          );
        })}
      </ul>
    );
  }

  render() {
    return(
      <div className="upload_form_wrapper">
        <form className="upload-form">
          <div className="upload-form-header">
            <h2 className="upload-form-subheader">We can't wait for your jam!</h2>
            <br/>
            <div className="song-uploader-container">
              <input type="file" className="audio-uploader" />
            </div>
          </div>
          <div className="upload-form-box">
            <div className="upload-form-content">
              <div className="song-image-uploader-container">
                <img className="uploaded-song-image-preview"></img>
                <input type="file" className="image-uploader" />
              </div>
              {this.renderErrors()}
              <div className="upload-form-fill-blank">
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
                      <option value={this.state.genre}>Ambient</option>
                      <option value={this.state.genre}>Classical</option>
                      <option value={this.state.genre}>Country</option>
                      <option value={this.state.genre}>Dance & EDM</option>
                      <option value={this.state.genre}>Electronic</option>
                      <option value={this.state.genre}>Hip-hop & Rap</option>
                      <option value={this.state.genre}>Jazz & Blues</option>
                      <option value={this.state.genre}>Metal</option>
                      <option value={this.state.genre}>Piano</option>
                      <option value={this.state.genre}>R&B & Soul</option>
                      <option value={this.state.genre}>Rock</option>
                      <option value={this.state.genre}>World</option>
                    </select>
                  </label>
                </div>
                <div className="upload-form-description-input-container">
                  <label>
                    <div className="upload-form-data-name">
                      Description
                    </div>
                    <textarea placeholder="Description is optional" className="upload-form-description-input"></textarea>
                  </label>
                </div>
                <div className="upload-form-availability-input-container">
                  <label>
                    <div className="upload-form-data-name">
                      Availability
                    </div>
                    <input type="radio" value={this.state.availability} className="upload-form-availability-input" checked="checked"/>Public<br/>
                    <input type="radio" value={this.state.availability} className="upload-form-availability-input" />Private<br/>
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
