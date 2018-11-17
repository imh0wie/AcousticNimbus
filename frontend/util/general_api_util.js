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

export const generateCreationTime = (date) => {
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