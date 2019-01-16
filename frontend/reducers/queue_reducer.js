import { CREATE_QUEUE, REPLACE_QUEUE, SHUFFLE_QUEUE, ADD_SONG_TO_QUEUE, REMOVE_SONG_FROM_QUEUE, ADD_TO_PLAY_NEXT } from "../actions/queue_actions";
import { randomize } from "../util/general_api_util"
import { songsByCreationDate } from "../util/song_api_util"
import { merge } from "lodash";

const queueReducer = (state = null, action) => {
    Object.freeze(state);
    let newState;
    switch (action.type) {
        case CREATE_QUEUE:
        case REPLACE_QUEUE:
            newState = {
                unshuffled: action.queue, 
                shuffled: randomize(action.queue.slice()),
            }
            return newState;
        case SHUFFLE_QUEUE:
            newState = {
                unshuffled: state.unshuffled, 
                shuffled: randomize(state.shuffled.slice()),
            }
            return newState;
        case ADD_SONG_TO_QUEUE:
            newState = {
                unshuffled: state.unshuffled.slice().push(action.song), 
                shuffled: randomize(state.unshuffled.slice().push(action.song)),
            }
            return newState
        case REMOVE_SONG_FROM_QUEUE:
            newUnshuffled = [];
            newShuffled = [];
            state.unshuffled.forEach(song => {
                if (song.id !== action.song.id) newUnshuffled.push(song);
            })
            state.shuffled.forEach(song => {
                if (song.id !== action.song.id) newShuffled.push(song);
            })
            newState = {
                unshuffled: newUnshuffled,
                shuffled: newShuffled,
            }
            return newState;
        case ADD_TO_PLAY_NEXT:
            newState = {
                unshuffled: state.unshuffled.slice().unshift(action.song),
                shuffled: state.shuffled.slice().unshift(action.song),
            }
            return newState;
        default:
            return state;
    }
}

export default queueReducer;