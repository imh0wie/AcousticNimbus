import { combineReducers } from "redux";
import ModalReducer from "./modal_reducer";
import currentSongReducer from "./current_song_reducer";
import chartsReducer from "./charts_reducer";
import reloadingReducer from "./reloading_reducer";

const uiReducer = combineReducers({
  modal: ModalReducer,
  currentSong: currentSongReducer,
  charts: chartsReducer,
  reloading: reloadingReducer
});

export default uiReducer;
