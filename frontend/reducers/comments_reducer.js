import { RECEIVE_COMMENTS } from "../actions/comment_actions";
import { merge } from "lodash";

const commentsReducer = (state = null, action) => {
    Object.freeze(state);
    let newState;
    switch (action.type) {
        case RECEIVE_COMMENTS:
            newState = merge({}, action.comments);
            return merge({}, newState);
        default:
            return state;
    }
}

export default commentsReducer;