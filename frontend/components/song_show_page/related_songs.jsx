import React from "react";
import { Link } from "react-router-dom";

const RelatedSongs = (props) => {
    debugger
    return (
        <div className="related-songs">
            <div className="header"> 
                <p><i className="fas fa-music"></i> Related Songs</p>
                <Link to="" onClick={(e) => e.preventDefault()}>View All</Link>
            </div>
        </div>
    );
}

export default RelatedSongs;