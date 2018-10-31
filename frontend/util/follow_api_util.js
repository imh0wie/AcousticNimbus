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
    debugger
    // onPageSong ? onPageSong.artistId : null;
    if (onPageSong) {
        debugger
        return onPageSong.artistId;
    } else {
        debugger
        return null;
    }
}

export const followOf = (followedUserId, followerId, follows) => {
    if (isEmpty(follows)) return null;
    const followIds = Object.keys(follows);
    for (let i = 0; i < followIds.length; i++ ) {
        const followId = followIds[i];
        const follow = follows[followId];
        if (follow.followedUserId === followedUserId && follow.followerId === followerId) return follow;
    }
    return null;
}

// export const followed = (artistId, currentUserId, follows) => {
//     debugger
//     if (isEmpty(follows)) return null;
//     const followIds = Object.keys(follows);
//     debugger
//     followIds.some((followId) => {
//         const follow = follows[followId];
//         debugger
//         return followed_user_id === artistId && follower_id === currentUserId;
//     })
// }