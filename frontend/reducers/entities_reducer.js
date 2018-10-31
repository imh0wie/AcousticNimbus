import { combineReducers } from "redux";
import usersReducer from "./users_reducer";
import songsReducer from "./songs_reducer";
import likesReducer from "./likes_reducer";
import followsReducer from "./follows_reducer";
import commentsReducer from "./comments_reducer";

const entitiesReducer = combineReducers({
  users: usersReducer,
  songs: songsReducer,
  likes: likesReducer,
  follows: followsReducer,
  comments: commentsReducer,
});

export default entitiesReducer;
