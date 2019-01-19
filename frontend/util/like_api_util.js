export const createLike = (like) => {
    return $.ajax({
        method: "POST",
        url: "/api/likes",
        data: { like },
    });
};

export const removeLike = (like) => {
    return $.ajax({
        method: "DELETE",
        url: `/api/likes/${like.id}`,
        data: { like },
    });
}

export const fetchLikes = () => {
    return $.ajax({
        method: "GET",
        url: "/api/likes",
    });
};

export const likeOf = (likerId, likeableType, likeableId, likes) => {
    if (!likes) return null;
    likes = Object.values(likes);
    for (let i = 0; i < likes.length; i++) {
        const like = likes[i];
        if (like.likerId === likerId && like.likeableType === likeableType && like.likeableId === likeableId) return like;
    }
    return null;
}