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