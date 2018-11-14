import { CHANGE_ORDER } from "../actions/chart_actions";
import { merge } from "lodash";
const defaultState = {
    order: "newest",
};

const chartsReducer = (state = defaultState, action) => {
    Object.freeze(state);
    switch (action.type) {
        case "CHANGE_ORDER":
            return merge({}, state, action.order);
        default:
            break;
    }
}

export default chartsReducer;