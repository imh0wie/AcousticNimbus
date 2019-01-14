import { RECEIVE_QUEUE, ADD_SONG_TO_QUEUE, REMOVE_SONG_FROM_QUEUE, ADD_TO_PLAY_NEXT } from "../actions/queue_actions";
import { merge } from "lodash";

const queueReducer = (state = null, action) => {
    Object.freeze(state);
    let newState;
    switch (action.type) {
        case RECEIVE_QUEUE:
            newState = action.queue;
            return merge({}, newState);
        case ADD_SONG_TO_QUEUE:
            newState = action.queue;
            return merge({}, state, newState);
        // case REMOVE_SONG_FROM_QUEUE:
        case ADD_TO_PLAY_NEXT:
            newState = action.song;
            return merge({}, newState, state);
        default:
            break;
    }
}

export default queueReducer;