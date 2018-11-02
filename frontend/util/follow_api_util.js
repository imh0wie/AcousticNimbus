import { isEmpty } from "./general_api_util";
import { songsOf } from "./song_api_util";

export const createFollow = (follow) => {
    return $.ajax({
        method: "POST",
        url: "/api/follows",
        data: { follow },
    });
};

export const removeFollow = (id) => {
    return $.ajax({
        method: "DELETE",
        url: `/api/follows/${id}`,
    });
}

export const fetchFollows = () => {
    return $.ajax({
        method: "GET",
        url: "/api/follows",
    });
};

export const artistIdOf = (onPageSong) => {
    return onPageSong ? onPageSong.artistId : null;
    // if (onPageSong) {
    //     return onPageSong.artistId;
    // } else {
    //     return null;
    // }
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

export const followingsOf = (followerId, follows) => {
    if (isEmpty(follows)) return null;
    const output = [];
    const followIds = Object.keys(follows);
    for (let i = 0; i < followIds.length; i++ ) {
        const followId = followIds[i];
        const follow = follows[followId];
        if (follow.followerId === followerId) output.push(follow);
    }
    return null;
}

export const followedUsersOf = (currentUser, follows, users) => {
    if (isEmpty(follows)) return [];
    const followIds = Object.keys(follows);
    const output = [];
    followIds.forEach((followId) => {
        const follow = follows[followId];
        if (follow.followerId === currentUser.id) {
            output.push(users[follow.followedUserId]);
        }
    })
    return output;
}

export const followedSongs = (users, songs) => {
    if (users.length === 0 || isEmpty(songs)) return null;
    let output = [];
    users.forEach((user) => {
        const tracks = songsOf(user, songs);
        output = output.concat(tracks);
    })
    return output;
}