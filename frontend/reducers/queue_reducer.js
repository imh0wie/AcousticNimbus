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
            const unshuffledIdx = state.unshuffled.map(song => song.id).indexOf(action.song.id);
            const shuffledIdx = state.shuffled.map(song => song.id).indexOf(action.song.id);
            newState = {
                unshuffled: unshuffledIdx > 0 ? state.unshuffled.slice(0, unshuffledIdx).concat(state.unshuffled.slice(unshuffledIdx + 1)) : state.unshuffled.slice(0),
                shuffled: shuffledIdx > 0 ? state.shuffled.slice(0, shuffledIdx).concat(state.shuffled.slice(shuffledIdx + 1)) : state.shuffled.slice(0),
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