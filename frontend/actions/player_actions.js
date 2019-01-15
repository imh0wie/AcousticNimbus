export const TOGGLE_LOOP = "TOGGLE_LOOP";
export const TOGGLE_SHUFFLE = "TOGGLE_SHUFFLE";

export const toggleLoop = () => {
    return {
        type: TOGGLE_LOOP,
    };
};

export const toggleShuffle = () => {
    return {
        type: TOGGLE_SHUFFLE, 
    };
};
