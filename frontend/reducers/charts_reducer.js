import { CHANGE_ORDER } from "../actions/chart_actions";
import { merge } from "lodash";
const defaultState = {
    order: "newest",
};

const chartsReducer = (state = defaultState, action) => {
    Object.freeze(state);
    switch (action.type) {
        case "CHANGE_ORDER":
        const newState = {
            order: action.order,
        }
            return merge({}, state, newState);
        default:
            return state;
    }
}

export default chartsReducer;