// import { OPEN_MODAL, CLOSE_MODAL } from "./../actions/modal_actions.js";
import { merge } from "lodash";
//
const OPEN_MODAL = "OPEN_MODAL";
const CLOSE_MODAL = "CLOSE_MODAL";

const modalReducer = (state = null, action) => {
  switch (action.type) {
    case OPEN_MODAL:
      const newModal = {
        modal: action.modal,
      };
      return merge({}, state, newModal);
    case CLOSE_MODAL:
      return null;
    default:
      return state;
  }
};

export default modalReducer;
