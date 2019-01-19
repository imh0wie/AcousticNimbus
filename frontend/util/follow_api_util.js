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

export const followOf = (followedUserId, follows) => {
    if (!follows) return null;
    for (let i = 0; i < follows.length; i++) {
        const follow = follows[i];
        if (follow.followedUserId === followedUserId) return follow;
    }
    return null;
}