import React from "react";
import { Link } from "react-router-dom";
import MiniList from "../common_components/mini_list/mini_list";

const RelatedSongs = (props) => {
    return (
        <div className="related-songs">
            <div className="header"> 
                <p><i className="fas fa-music"></i> Related Songs</p>
                <Link to="" onClick={(e) => e.preventDefault()}>View All</Link>
            </div>
            <MiniList 
                klass="song-show-page"
                song={props.song}
                songId={props.songId}
            />
        </div>
    );
}

export default RelatedSongs;