import { connect } from "react-redux";
import { login } from "../../../actions/session_actions";
import { openModal } from "../../../actions/modal_actions";
import Banner from "./banner";

const mdp = (dispatch) => {
  return {
    login: (user) => dispatch(login(user)),
    openModal: (modal) => dispatch(openModal(modal)),
  };
};

export default connect(null, mdp)(Banner);