import React from "react";
import ArtistsList from "./artists_list";

const WhoToFollow = () => {
    return (
        <div className="who-to-follow">
            <div className="header"> 
                <p><i className="fas fa-users"></i><i class="fas fa-user-friends"></i> Who to follow</p>
                <p><i class="fas fa-redo-alt"></i> Refresh</p>
            </div>
            {/* <ArtistsList /> */}
        </div>
    );
}

export default WhoToFollow;