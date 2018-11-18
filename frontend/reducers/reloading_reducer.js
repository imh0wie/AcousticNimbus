import { RECEIVE_RELOADING } from "../actions/reloading_actions";

const reloadingReducer = (state = false, action) => {
    switch (action.type) {
        case RECEIVE_RELOADING:
            return !state;
        default:
            return state;
    }
}

export default reloadingReducer;