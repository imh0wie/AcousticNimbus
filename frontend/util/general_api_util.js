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

export const areIdenticalObjs = (obj1, obj2) => {
    if (!obj1 || !obj2) return false
    if (Object.keys(obj1).length !== Object.keys(obj2).length) return false;
    for (let key in obj1) {
        if (obj1[key] !== obj2[key]) return false;
    }
    return obj;
}

export const areIdenticalArrs = (arr1, arr2) => {
    if (!arr1 || !arr2) return false
    if (arr1.length !== arr2.length) return false;
    for (let i = 0; i < arr1.length; i++) {
        const el1 = arr1[i];
        const el2 = arr2[i];
        if (typeof el1 === "object" && typeof el2 === "object") {
            if (!areIdenticalObjs(el1, el2)) return false
        } else {
            if (el1 !== el2) return false;
        }
    }
    return true;
}

export const generateCreationTime = (date) => {
    if (!date) return "0 second ago";
    const itemLife = Math.abs(new Date() - new Date(date)) / 1000;
    if (itemLife < 60) {
        const unit = Math.floor(itemLife) > 1 ? "seconds" : "second";
        return `${Math.floor(itemLife)} ${unit} ago`;
    } else if (itemLife < 3600) {
        const unit = Math.floor(itemLife / 60) > 1 ? "minutes" : "minute";
        return `${Math.floor(itemLife / 60)} ${unit} ago`;
    } else if (itemLife < 86400) {
        const unit = Math.floor(itemLife / 3600) > 1 ? "hours" : "hour";
        return `${Math.floor(itemLife / 3600)} ${unit} ago`;
    } else if (itemLife < 2592000) {
        const unit = Math.floor(itemLife / 86400) > 1 ? "days" : "day";
        return `${Math.floor(itemLife / 86400)} ${unit} ago`;
    } else if (itemLife < 31104000) {
        const unit = Math.floor(itemLife / 2592000) > 1 ? "months" : "month";
        return `${Math.floor(itemLife / 2592000)} ${unit} ago`;
    } else {
        const unit = Math.floor(itemLife / 31104000) > 1 ? "years" : "year";
        return `${Math.floor(itemLife / 31104000)} ${unit} ago`;
    }
}

export const generateSongLength = (secs) => {
    let date = new Date(null);
    date.setSeconds(secs);
    return (
        date.toTimeString().slice(4, 8)
    );
}

export const jsonize = (arr) => {
    const output = {};
    arr.forEach(el => output[el.id] = el);
    return output;
}

export const rotate = (arr, n = 1) => {
    if (n % arr.length === 0) return arr;
    n = n >= 0 ? (n % arr.length) : ((arr.length + n) % arr.length);
    const output1 = arr.slice(n);
    const output2 = arr.slice(0, n);
    return output1.concat(output2);
}

export const randomize = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}