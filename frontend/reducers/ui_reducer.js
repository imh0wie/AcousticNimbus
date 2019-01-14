import { combineReducers } from "redux";
import ModalReducer from "./modal_reducer";
import currentSongReducer from "./current_song_reducer";
import chartsReducer from "./charts_reducer";
import reloadingReducer from "./reloading_reducer";
import queueReducer from "./queue_reducer";

const uiReducer = combineReducers({
  modal: ModalReducer,
  currentSong: currentSongReducer,
  queue: queueReducer,
  charts: chartsReducer,
  reloading: reloadingReducer
});

export default uiReducer;
