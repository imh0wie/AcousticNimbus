import React from "react";

const ArtistListItem = () => {
    return (
        <li>
            <img src={this.props.artist.imageURL ? this.props.artist.imageURL : window.default_avatar}></img>
            <p>{this.props.artist.username}</p>
            <p>{this.props.artistFollowers.length}</p>
            <p>{this.props.artistSongs.length}</p>
        </li>
    );
}

export default ArtistListItem;