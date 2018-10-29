import { isEmpty } from "./general_api_util";

export const createFollow = (follow) => {
    debugger
    return $.ajax({
        method: "POST",
        url: "/api/follows",
        data: { follow },
    });
};

export const removeFollow = (id) => {
    debugger
    return $.ajax({
        method: "DELETE",
        url: `/api/follows/${id}`,
    });
}

export const fetchFollows = () => {
    debugger
    return $.ajax({
        method: "GET",
        url: "/api/follows",
    });
};

export const artistIdOf = (onPageSong) => {
    onPageSong ? onPageSong.artistId : null;
    // const songIds = Object.keys(songs);
    // for (let i = 0; i < songIds.length; i++) {
    //     const songId = songIds[i];
    //     const song = songs[songId];
    //     if (song.id === onPageSong.id) {
    //         return onPageSong.artistId;
    //     }
    // }
}

export const followed = (artistId, currentUserId, follows) => {
    debugger
    if (isEmpty(follows)) return null;
    const followIds = Object.keys(follows);
    debugger
    followIds.some((followId) => {
        const follow = follows[followId];
        debugger
        return followed_user_id === artistId && follower_id === currentUserId;
    })
}