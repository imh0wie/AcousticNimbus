import { TOGGLE_QUEUE_LIST } from "../actions/queue_list_actions";

const queueListReducer = (state = false, action) => {
    Object.freeze(state);
    let newState;
    switch (action.type) {
        case TOGGLE_QUEUE_LIST:
            newState = !state;
            return newState;
        default:
            return state;
    }
}

export default queueListReducer;