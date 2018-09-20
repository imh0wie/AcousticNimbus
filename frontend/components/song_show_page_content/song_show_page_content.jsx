import React from "react";

class SongShowPageContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  renderUserCommentArea() {
    if (this.props.currentUser.imageURL) {
      return(
        <div className="song-show-page-comment-bar">
          <img src={window.barlogo} className="song-show-page-commenter-pic" />
          <div className="song-show-page-comment-box-container">
            <form>
              <input type="text" placeholder="Write a comment..." className="song-show-page-comment-box" />
            </form>
          </div>
        </div>
      );
    } else {
      return(
        <div className="song-show-page-comment-bar">
          <img src={window.default_avatar} className="song-show-page-commenter-pic" />
          <div className="song-show-page-comment-box-container">
            <form>
              <input type="text" placeholder="Write a comment..." className="song-show-page-comment-box" />
            </form>
          </div>
        </div>
      );
    }
  }

  render() {
    return (
      <div className="song-show-page-content-container">
        <div className="song-show-page-song-info-container">
          <div className="song-show-page-social-bar-container">
            <div className="song-show-page-comment-bar-container">
              {this.renderUserCommentArea}
            </div>
            <div className="song-show-page-social-bar">
              <div className="song-show-page-social-buttons">
                <button className="song-show-page-like-button">Like</button>
                <button className="song-show-page-share-button">Share</button>
              </div>
              <div className="song-show-page-social-info">
                <p className="song-show-page-playback-count">playback count</p>
                <p className="song-show-page-likes">likes</p>
              </div>
            </div>
          </div>
          <div className="song-show-page-song-info-container">
            <div className="song-show-page-artist-info-container">
              <div className="song-show-page-artist-social-info">
                <p className="song-show-page-followers-count">followers count</p>
                <p className="song-show-page-tracks-count">tracks count</p>
              </div>
              <button className="song-show-page-follow-button"></button>
            </div>
            <div className="song-show-page-description-comments">
              <div className="song-show-page-description">
                <p>this.props.currentSong.description</p>
              </div>
              <div className="song-show-page-comments-container">
                <div className="song-show-page-comments-header">
                  <h2 className="song-show-page-comment-count">comment count</h2>
                </div>
                <div className="song-show-page-comment-list">
                  <h2>comment list</h2>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="song-show-page-related-tracks-bar">
          <h2>Related tracks</h2>
        </div>
      </div>
    );
  }
}

export default SongShowPageContent;
