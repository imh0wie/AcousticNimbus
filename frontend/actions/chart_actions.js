export const CHANGE_ORDER = "CHANGE_ORDER"; 

export const changeOrder = (order) => {
    return ({
        type: CHANGE_ORDER,
        order: order,
    })
};