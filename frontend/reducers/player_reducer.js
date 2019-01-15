import { TOGGLE_LOOP, TOGGLE_SHUFFLE } from "../actions/player_actions";
import { rotate } from "../util/general_api_util";
import { merge } from "lodash";

const defaultState = {
    loop: ["off", "all", "one"],
    shuffle: false,
}

const playerReducer = (state = defaultState, action) => {
    Object.freeze(state);
    let newState;
    switch (action.type) {
        case TOGGLE_LOOP:
            newState = {
                loop: rotate(state.loop),
            }
            return merge({}, state, newState); 
        case TOGGLE_SHUFFLE:
            newState = {
                shuffle: !state.shuffle,
            }
            return merge({}, state, newState);
        default:
            return state;
    }
}

export default playerReducer;