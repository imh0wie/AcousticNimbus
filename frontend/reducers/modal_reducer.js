// import { OPEN_MODAL, CLOSE_MODAL } from "./../actions/modal_actions.js";
import { merge } from "lodash";
//
const OPEN_MODAL = "OPEN_MODAL";
const CLOSE_MODAL = "CLOSE_MODAL";

const modalReducer = (state = null, action) => {
  debugger
  switch (action.type) {
    case OPEN_MODAL:
      const newModal = {
        modal: action.modal
      }
      debugger
      return merge({}, state, newModal);
    case CLOSE_MODAL:
      // debugger
      return null;
    default:
    // debugger
      return state;
  }
}

export default modalReducer;
