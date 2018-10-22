import { RECEIVE_LIKES } from "../actions/like_actions";
import { merge } from "lodash";

const defaultState = {
  id: null,
  likeableType: null,
  likeableId: null,
  likerId: null,
};
const likesReducer = (state = defaultState, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_LIKES:
      debugger
      return merge({}, action.likes);
    default:
      return state;
  }
};

export default likesReducer;
