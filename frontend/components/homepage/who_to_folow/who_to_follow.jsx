import React from "react";
import ArtistsList from "./artists_list";

const WhoToFollow = () => {
    return (
        <div className="who-to-follow">
            <div> className="header
                <p><i className="fas fa-users"></i> Who to follow</p>
            </div>
            <ArtistsList />
        </div>
    );
}

export default WhoToFollow;