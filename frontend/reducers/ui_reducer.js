import { combineReducers } from "redux";
import ModalReducer from "./modal_reducer";
import currentSongReducer from "./current_song_reducer";
import chartsReducer from "./charts_reducer";
import reloadingReducer from "./reloading_reducer";
import queueReducer from "./queue_reducer";
import queueListReducer from "./queue_list_reducer";
import playerReducer from "./player_reducer";

const uiReducer = combineReducers({
  modal: ModalReducer,
  currentSong: currentSongReducer,
  player: playerReducer,
  queue: queueReducer,
  queueList: queueListReducer,
  charts: chartsReducer,
  reloading: reloadingReducer
});

export default uiReducer;
