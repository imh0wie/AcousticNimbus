import { connect } from "react-redux";
import HeaderBar from "./header_bar";

const msp = (state) => {
  debugger
  return {
    currentUser: state.entities.users[state.session.id],
  };
};

export default connect(msp, null)(HeaderBar);
