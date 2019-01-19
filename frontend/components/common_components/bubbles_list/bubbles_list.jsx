import React from "react";
import { withRouter } from "react-router-dom";
import BubblesListItem from "./bubbles_list_item";

const BubblesList = (props) => {
    if (!props.items) {
        return null;
    } else if (props.items.length === 0) {
        return <p>No users found :(</p>
    } else {
        return (
            <ul>
                {Object.keys(props.items).map((item, i) => {
                    return (
                        <BubblesListItem
                            key={i}
                            user={item}
                        />
                    );
                })}
            </ul>
        );
    }
}

export default withRouter(BubblesList);