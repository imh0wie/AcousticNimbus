import React from "react";

class CommentsListItem extends React.Component {
    constructor(props) {
        super(props);
        this.handleRemove = this.handleRemove.bind(this);
        this.renderUsername = this.renderUsername.bind(this);
        this.renderCreationTime = this.renderCommentCreationTime.bind(this);
        this.renderDeleteButton = this.renderDeleteButton.bind(this);
    }

    handleRemove(id) {
        this.props.removeComment(id);
    }

    renderUsername() {
        const username = this.props.comment.commenterId === this.props.currentUser.id ? "You" : this.props.commenter.username;
        return (   
            <h1><span className="username">{username}</span> at <span className="time">0:00</span>:</h1>
        );
        // debugger
        // debugger
        // const audio = new Audio(this.props.onPageSong.audioURL);
        // // const audioDuration = audio.duration;
        // let audioDuration;
        // audio.onloaded = () => {
        //     audioDuration = audio.duration;
        // };
        // debugger
        // if (this.props.currentSong.song && this.props.c.id === this.props.currentSong.song.id) {
        //     return (   
        //         <h1><span className="username">{username}</span> at <span className="time">{this.state. * audioDuration}</span>:</h1>
        //     );
        // } else {
        //     return (   
        //         <h1><span className="username">{username}</span> at <span className="time">0:00</span>:</h1>
        //     );
        // }
    }

    renderCommentCreationTime(date) {
        const commentLife = Math.abs(new Date() - new Date(date)) / 1000;
        if (commentLife < 60) {
            const unit = Math.floor(commentLife) > 1 ? "seconds" : "second";
            return `${Math.floor(commentLife)} ${unit} ago`;
        } else if (commentLife < 3600) {
            const unit = Math.floor(commentLife / 60) > 1 ? "minutes" : "minute";
            return `${Math.floor(commentLife / 60)} ${unit} ago`;
        } else if (commentLife < 86400) {
            const unit = Math.floor(commentLife / 3600) > 1 ? "hours" : "hour";
            return `${Math.floor(commentLife / 3600)} ${unit} ago`;
        } else if (commentLife < 2592000) {
            const unit = Math.floor(commentLife / 86400) > 1 ? "days" : "day";
            return `${Math.floor(commentLife / 86400)} ${unit} ago`;
        // } else if (commentLife < 2592000) {
        //     return `${Math.floor(commentLife / 604800)}w ago`;
        } else if (commentLife < 31104000) {
            const unit = Math.floor(commentLife / 2592000) > 1 ? "months" : "month";
            return `${Math.floor(commentLife / 2592000)} ${unit} ago`;
        } else {
            const unit = Math.floor(commentLife / 31104000) > 1 ? "years" : "year";
            return `${Math.floor(commentLife / 31104000)} ${unit} ago`;
        }
    }

    renderDeleteButton() {
        if (this.props.commenter.id === this.props.currentUser.id || this.props.onPageSong.artistId === this.props.currentUser.id) {
            return <button className="delete" onClick={() => this.handleRemove(this.props.comment.id)}><i class="fas fa-trash"></i></button>
        }
    }

    render() {
        return (
            <li className="song-show-page-comments-list-item">
                <div className="comment-container">
                    <img src={this.props.commenter.imageURL ? this.props.commenter.imageURL : window.default_avatar} className="comments-list-item-commenter-img"></img>
                    <div>
                        {this.renderUsername()}
                        <p>{this.props.comment.body}</p>
                    </div>
                </div>
                <div className="date-delete">
                    <p className="date">{this.renderCommentCreationTime(this.props.comment.createdAt)}</p>
                    {this.renderDeleteButton()}
                </div>
            </li>
        );
    }
}

export default CommentsListItem;