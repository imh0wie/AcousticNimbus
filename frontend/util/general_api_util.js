export const isEmpty = (obj) => {
    for (let key in obj) {
        if (!obj[key]) {
            continue;
        } else if (obj.hasOwnProperty(key)) {
            return false;
        }
    }
    return true;
}

export const randomize = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}