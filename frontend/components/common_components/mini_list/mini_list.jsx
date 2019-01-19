import React from "react";
import { withRouter } from "react-router-dom";
import MiniListItem from "./mini_list_item";

const MiniList = (props) => {
    let miniListItems;
    switch (props.klass) {
        case "likes-section":
            miniListItems = props.likedSongs.slice(0, 3);
            break;
        case "song-show-page":
            miniListItems = props.relatedSongs;
            break;
        default:
            break;
    }
    const message = props.klass === "song-show-page" ? "No similar songs in database at this moment." : "This user has not liked any songs yet.";
    if (miniListItems.length === 0) return <p className="ui-msg">{message}</p>
    return (
        <ul>
            {miniListItems.map((item) => {
                return (
                    <MiniListItem
                    key={item.id}
                    song={item}
                    />
                );
            })}
        </ul>
    );
}

export default withRouter(MiniList);