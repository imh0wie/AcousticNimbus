import React from "react";
import { Link } from "react-router-dom";

class SocialElements extends React.Component {
    constructor(props) {
        super(props);
    }

    handleLike(e) {
        e.preventDefault();
        if (this.props.currentLike) {
          this.props.removeLike(this.props.currentLike.id);
        } else {
            const like = {
                likeable_type: "Song",
                likeable_id: this.props.songId,
                liker_id: this.props.currentUser.id,
            }
            this.props.createLike(like);
        }
    }

    renderButtons() {
        switch (this.props.klass) {
            case "banner-player":
                return (
                    <div className="left">
                        <button className={this.props.currentLike ? "liked-button" : "like-button"} onClick={(e) => this.handleLike(e)}><i className="fas fa-heart"></i> {this.props.currentLike ? "Liked" : "Like"}</button>
                    </div>
                );
            case "item-player":
                return (
                    <div className="left">
                        <p className={this.props.currentLike ? "liked-button" : "like-button"} onClick={(e) => this.handleLike(e)}><i className="fas fa-heart"></i> {this.props.currentLikes.length}</p>
                    </div>
                );
        }
    }

    renderSocialData() {
        switch (this.props.klass) {
            case "banner-player":
                return (
                    <div className="right">
                        <p><i className="fas fa-heart"></i> {this.props.currentLikes.length}</p> 
                    </div>
                );
            case "item-player":
                return (
                    <div className="right">
                        <Link to={`/songs/${this.props.songId}`}><i className="fas fa-comment-alt"></i>{this.props.currentComments.length}</Link> 
                    </div>
                );
        }
    }

    render() {
        if (this.props.klass === "none") return <div></div>;
        return (
            <div className="social-els">
                {this.renderButtons()}
                {this.renderSocialData()}
            </div>
        );
    }
}

export default SocialElements;