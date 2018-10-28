import { combineReducers } from "redux";
import usersReducer from "./users_reducer";
import songsReducer from "./songs_reducer";
import likesReducer from "./likes_reducer";
import followsReducer from "./follows_reducer";

const entitiesReducer = combineReducers({
  users: usersReducer,
  songs: songsReducer,
  likes: likesReducer,
  follows: followsReducer,
});

export default entitiesReducer;
