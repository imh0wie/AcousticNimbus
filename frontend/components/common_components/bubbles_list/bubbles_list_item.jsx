import React from "react";
import { Link } from "react-router-dom"

const BubblesListItem = (props) => {
    debugger
    return (
        <li>
            <Link to={`/users/${props.user.id}`}><img src={props.user.imageURL ? props.user.imageURL : window.user_dp} className="user-image"></img></Link>
        </li>
    );
}

export default BubblesListItem;