import { isEmpty } from "./general_api_util";
import { songsOf } from "./song_api_util";

export const createFollow = (follow) => {
    return $.ajax({
        method: "POST",
        url: "/api/follows",
        data: { 
            follow: follow,
            current_user_id: follow.follower_id,
        },
    });
};

export const removeFollow = (follow) => {
    return $.ajax({
        method: "DELETE",
        url: `/api/follows/${follow.id}`,
        data: { 
            id: follow.id,
            current_user_id: follow.follower_id,
        },
    });
}

export const fetchFollows = () => {
    return $.ajax({
        method: "GET",
        url: "/api/follows",
    });
};

export const fetchFollowingsOf = (followerId) => {
    return $.ajax({
        method: "GET",
        url: "/api/follows",
        data: {
            follower_id: followerId,
        },
    });
}

export const artistIdOf = (onPageSong) => {
    return onPageSong ? onPageSong.artistId : null;
    // if (onPageSong) {
    //     return onPageSong.artistId;
    // } else {
    //     return null;
    // }
}

// export const followOf = (followedUserId, followerId, follows) => {
//     if (!follows) return null;
//     const followIds = Object.keys(follows);
//     for (let i = 0; i < followIds.length; i++ ) {
//         const followId = followIds[i];
//         const follow = follows.interests[followId];
//         if (follow.followedUserId === followedUserId && follow.followerId === followerId) return follow;
//     }
//     return null;
// }

export const followOf = (userId, followsArr) => {
    if (!followsArr) return null;
    for (let i = 0; i < followsArr.length; i++) {
        const follow = followsArr[i];
        if (follow.followed_user_id === userId) return follow;
    }
    return null;
}

export const followersOf = (followedUserId, follows, users) => {
    if (!follows || !users) return null;
    const output = [];
    const followIds = Object.keys(follows);
    for (let i = 0; i < followIds.length; i++ ) {
        const followId = followIds[i];
        const follow = follows[followId];
        if (follow.followedUserId === followedUserId) output.push(users[follow.followerId]);
    }
    return output;
}

export const followedUsersOf = (currentUserId, follows, users) => {
    if (!follows || isEmpty(users) || !currentUserId) return null;
    const followIds = Object.keys(follows);
    const output = [];
    followIds.forEach((followId) => {
        const follow = follows[followId];
        if (follow.followerId === currentUserId) output.push(users[follow.followedUserId]);
    })
    return output;
}

export const followingsOf = (followerId, follows) => {
    if (!follows) return null;
    const output = [];
    const followIds = Object.keys(follows);
    for (let i = 0; i < followIds.length; i++ ) {
        const followId = followIds[i];
        const follow = follows[followId];
        if (follow.followerId === followerId) output.push(follow);
    }
    return output;
}

export const followsOf = (followerId, follows) => {
    if (!follows) return null;
    const output = [];
    const followIds = Object.keys(follows);
    for (let i = 0; i < followIds.length; i++ ) {
        const followId = followIds[i];
        const follow = follows[followId];
        if (follow.followedUserId === followerId) output.push(follow);
    }
    return output;
}

// export const followedSongs = (users, songs) => {
//     if (!users || !songs) return null;
//     let output = [];
//     console.log(users);
//     users.forEach((user) => {
//         const tracks = songsOf(user.id, songs);
//         if (!tracks) return null;
//         output = output.concat(tracks);
//     })
//     return output;
// }

export const followedSongs = (follows, songs) => {
    if (isEmpty(follows) || !follows || !songs) return null;
    follows = follows.byFollowedUserId;
    let output = [];
    const songIds = Object.keys(songs);
    songIds.forEach(songId => {
        const song = songs[songId];
        if (follows[song.artistId]) output.push(song);
    });
    return output;
}