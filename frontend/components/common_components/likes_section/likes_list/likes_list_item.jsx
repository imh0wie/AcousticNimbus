import React from "react";

const LikesListItem = (props) => {
    debugger
    return (
        <li>
            <img src={props.liker.imageURL ? props.liker.imageURL : window.user_dp} className="user-image"></img>
        </li>
    );
}

export default LikesListItem;