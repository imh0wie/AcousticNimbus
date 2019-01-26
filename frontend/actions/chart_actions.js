export const CHANGE_ORDER = "CHANGE_ORDER"; 
export const CHANGE_GENRE = "CHANGE_GENRE"; 
export const RESET_ORDER_AND_GENRE = "RESET_ORDER_AND_GENRE"; 

export const changeOrder = (order) => {
    return ({
        type: CHANGE_ORDER,
        order: order,
    });
};

export const changeGenre = (genre) => {
    return ({
        type: CHANGE_GENRE,
        genre: genre,
    });
};

export const resetOrderAndGenre = () => {
    return ({
        type: RESET_ORDER_AND_GENRE,
    });
}