export const RECEIVE_QUEUE = "RECEIVE_QUEUE";
export const ADD_SONG_TO_QUEUE = "ADD_SONG_TO_QUEUE";
export const RECEIVE_QUEUE = "RECEIVE_QUEUE";
export const ADD_SONG_TO_QUEUE = "ADD_SONG_TO_QUEUE";
export const REMOVE_SONG_FROM_QUEUE = "REMOVE_SONG_FROM_QUEUE";
export const ADD_TO_PLAY_NEXT = "ADD_TO_PLAY_NEXT";

export const receiveQueue = (queue) => {
    return {
        type: RECEIVE_QUEUE,
        queue: queue,
    };
}

export const addSongToQueue = (song) => {
    return {
        type: ADD_SONG_TO_QUEUE,
        song: song,
    };
}

export const removeSongFromQueue = (song) => {
    return {
        type: REMOVE_SONG_FROM_QUEUE,
        song: song,
    };
}

export const addToPlayNext = (song) => {
    return {
        type: ADD_TO_PLAY_NEXT,
        song: song,
    };
}