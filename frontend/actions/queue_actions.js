export const CREATE_QUEUE = "CREATE_QUEUE";
export const REPLACE_QUEUE = "REPLACE_QUEUE";
export const SHUFFLE_QUEUE = "SHUFFLE_QUEUE";
export const ADD_SONG_TO_QUEUE = "ADD_SONG_TO_QUEUE";
export const REMOVE_SONG_FROM_QUEUE = "REMOVE_SONG_FROM_QUEUE";
export const ADD_TO_PLAY_NEXT = "ADD_TO_PLAY_NEXT";

export const createQueue = (queue) => {
    return {
        type: CREATE_QUEUE,
        queue: queue,
    };
}

export const replaceQueue = (queue) => {
    return {
        type: REPLACE_QUEUE,
        queue: queue,
    }
}

export const shuffleQueue = () => {
    return {
        type: SHUFFLE_QUEUE,
    }
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