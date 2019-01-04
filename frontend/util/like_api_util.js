import { isEmpty } from "./general_api_util";

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

export const likesOf = (likeableType, likeableId, likes) => {
    if (!likes) return [];
    const likeIds = Object.keys(likes).reverse();
    let output = [];
    likeIds.forEach((likeId) => {
        const id = parseInt(likeId);
        const like = likes[id];
        if (like.likeableType === likeableType && like.likeableId === likeableId) {
            output.push(likes[likeId]);
        }
    })
    return output;
}

// export const likeOf = (likeableType, likeableId, liker, likes) => {
//     if (!likes || !liker) return null;
//     const likeIds = Object.keys(likes);
//     for (let i = 0; i < likeIds.length; i++ ) {
//         const likeId = likeIds[i];
//         const like = likes[likeId];
//         if (like.likeableType === likeableType && like.likeableId === likeableId && like.likerId === liker.id) return like;
//     }
//     return null;
// }

// export const likeOf = (likes, likerId) => {
//     if (!likes || !likerId) return null;
//     for (let i = 0; i < likes.length; i++) {
//         const like = likes[i];
//         if (like.likerId === likerId) return like;
//     }
//     return null;
// }

export const likeOf = (likerId, likeableType, likeableId, likes) => {
    if (!likes) return null;
    likes = Object.values(likes);
    for (let i = 0; i < likes.length; i++) {
        const like = likes[i];
        if (like.likerId === likerId && like.likeableType === likeableType && like.likeableId === likeableId) return like;
    }
    return null;
}

export const likesBy = (likes, userId) => {
    if (!likes) return null;
    const output = [];
    const likeIds = Object.keys(likes);
    likeIds.forEach((likeId) => {
        const like = likes[likeId];
        if (like.likerId === userId) output.push(like);
    })
    return output;
}

// export const liked = (currentUser, likes) => {
//     return likes.some((like) => {
//         return like.likerId === currentUser.id;
//     })
// }
