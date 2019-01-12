import { isEmpty, randomize } from "./general_api_util";

export const fetchUsers = (currentUserId) => {
    return $.ajax({
        method: "GET",
        url: "/api/users",
        data: {
            current_user_id: currentUserId,
        },
    })
}

export const fetchRandomThreeUsers = (currentUserId) => {
    return $.ajax({
        method: "GET",
        url: "/api/users",
        data: {
            current_user_id: currentUserId,
        },
    })
}

export const fetchLikersOfSpecificSong = (songId) => {
    return $.ajax({
        method: "GET",
        url: "/api/users",
        data: {
            song_id: songId,
        },
    })
}

export const fetchFollowersOfSpecificUser = (userId) => {
    return $.ajax({
        method: "GET",
        url: "/api/users",
        data: {
            user_id: userId,
        },
    })
}

export const fetchUser = (userId) => {
    return $.ajax({
        method: 'GET',
        url: `/api/users/${userId}`,
        data: {
            id: userId,
        }
    });
};
  
export const editUser = (user, userId) => {
    return $.ajax({
        method: 'PATCH',
        url: `/api/users/${userId}`,
        data: user,
        contentType: false,
        processData: false,
    });
};

// export const suggestedArtists = (n, follows, users, currentUserId) => {
//     if (!follows || !users) return null;
//     let output = [];
//     const userIds = randomize(Object.keys(users));
//     for (let i = 0; i < userIds.length; i++) {
//         const userId = parseInt(userIds[i]);
//         if (userId !== currentUserId && !followOf(userId, currentUserId, follows)) output.push(users[userId]);
//         if (output.length === n) break;
//     }
//     return output;
// }

export const suggestedArtists = (users) => {
    if (!users) return null;
    let output = [];
    if (isEmpty(users)) return output;
    users = randomize(Object.values(users));
    let i = 0;
    while (i < users.length) {
        const user = users[i];
        output.push(user);
        if (output.length === 3) break;
        i++;
    }
    return output;
}