import { isEmpty } from "./general_api_util";

export const createLike = (like) => {
    debugger
    return $.ajax({
        method: "POST",
        url: "/api/likes",
        data: { like },
    });
};

export const removeLike = (id) => {
    debugger
    return $.ajax({
        method: "DELETE",
        url: `/api/likes/${id}`,
    });
}

export const fetchLikes = () => {
    return $.ajax({
        method: "GET",
        url: "/api/likes",
    });
};

// export const likesOf = (likeableType, likeableId, likes) => {
//     if (isEmpty(likes)) return [];
//     const likeIds = Object.keys(likes).reverse();
//     let output = [];
//     likeIds.forEach((likeId) => {
//         const id = parseInt(likeId);
//         const like = likes[id];
//         debugger
//         if (like.likeableType === likeableType && like.likeableId === likeableId) {
//             debugger
//             output.push(likes[likeId]);
//         }
//     })
//     return output;
// }

export const likeOf = (likeableType, likeableId, liker, likes) => {
    if (isEmpty(likes)) return null;
    debugger
    const likeIds = Object.keys(likes);
    for (let i = 0; i < likeIds.length; i++ ) {
        const likeId = likeIds[i];
        const like = likes[likeId];
        debugger
        if (like.likeableType === likeableType && like.likeableId === likeableId && like.likerId === liker.id) return like;
    }
    debugger
    return null;
}

// export const liked = (currentUser, likes) => {
//     return likes.some((like) => {
//         return like.likerId === currentUser.id;
//     })
// }
