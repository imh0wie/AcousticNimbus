import { RECEIVE_COMMENTS, EMPTY_COMMENTS_OF_SPECIFIC_SONG } from "../actions/comment_actions";
import { merge } from "lodash";

const commentsReducer = (state = null, action) => {
    Object.freeze(state);
    let newState;
    switch (action.type) {
        case EMPTY_COMMENTS_OF_SPECIFIC_SONG:
            newState = action.defaultState;
            return merge({}, newState);
        case RECEIVE_COMMENTS:
            newState = merge({}, action.comments);
            return merge({}, newState);
        default:
            return state;
    }
}

export default commentsReducer;