import React from "react";
import YourSongsList from "./your_songs_list/your_songs_list"

const SongsEditPage = () => {
    return (
        <div className="songs-edit-page">
            <header>Your songs</header>
            <div className="bar">
            </div>
            <YourSongsList />
        </div>
    );
}

export default SongsEditPage;

