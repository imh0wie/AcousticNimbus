import React from "react";

class SocialElements extends React.Component {
    constructor(props) {
        super(props);
    }

    handleLike(e) {
        e.preventDefault();
        debugger
        if (this.props.currentLike) {
          this.props.removeLike(this.props.currentLike.id);
        } else {
            let id;
            switch (this.props.klass) {
                case "song-show-page":
                    id = this.props.songId;
                case "item-player":
                    id = this.props.itemId;
            }
            const like = {
                likeable_type: "Song",
                likeable_id: id,
                liker_id: this.props.currentUser.id,
            }
            debugger
            this.props.createLike(like);
        }
    }

    renderButtons() {
        switch (this.props.klass) {
            case "song-show-page":
                return (
                    <div className="left">
                        <button className={this.props.currentLike ? "liked-button" : "like-button"} onClick={(e) => this.handleLike(e)}><i className="fas fa-heart"></i> {this.props.currentLike ? "Liked" : "Like"}</button>
                    </div>
                );
            case "item-player":
                debugger
                return (
                    <div className="left">
                        <button className={this.props.currentLike ? "liked-button" : "like-button"} onClick={(e) => this.handleLike(e)}><i className="fas fa-heart"></i> {this.props.itemLikes.length}</button>
                    </div>
                );
        }
    }

    renderSocialData() {
        switch (this.props.klass) {
            case "song-show-page":
                return (
                    <div className="right">
                        <p><i className="fas fa-heart"></i> {this.props.currentLikes.length}</p> 
                    </div>
                );
            case "item-player":
                return (
                    <div className="right">
                        <p><i className="fas fa-comment-alt"></i> {this.props.itemComments.length}</p> 
                    </div>
                );
        }
    }

    render() {
        return (
            <div className="social-els">
                {this.renderButtons()}
                {this.renderSocialData()}
            </div>
        );
    }
}

export default SocialElements;