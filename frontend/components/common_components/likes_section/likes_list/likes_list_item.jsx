import React from "react";
import { Link } from "react-router-dom"

const LikesListItem = (props) => {
    debugger
    return (
        <li>
            <Link to={`/users/${props.liker.id}`}><img src={props.liker.imageURL ? props.liker.imageURL : window.user_dp} className="user-image"></img></Link>
        </li>
    );
}

export default LikesListItem;