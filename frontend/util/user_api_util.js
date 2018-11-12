import { isEmpty, randomize } from "./general_api_util";
import { followOf } from "./follow_api_util";

export const fetchUsers = () => {
    return $.ajax({
        method: "GET",
        url: "/api/users"
    })
}

export const fetchUser = (userId) => {
    return $.ajax({
        method: 'GET',
        url: `/api/users/${userId}`,
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

export const suggestedArtists = (n, follows, users, currentUserId) => {
    // debugger
    if (isEmpty(follows) || (Object.keys(users).includes(currentUserId.toString()) && Object.keys(users).length === 1)) return null;
    let output = [];
    const userIds = randomize(Object.keys(users));
    // debugger
    for (let i = 0; i < userIds.length; i++) {
        const userId = userIds[i];
        // debugger
        if (userId !== currentUserId.toString() && !followOf(parseInt(userId), currentUserId, follows)) output.push(users[userId]);
        // debugger
        if (output.length === n) break;
    }
    // debugger
    return output;
}