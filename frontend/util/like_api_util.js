import { isEmpty } from "./general_api_util";

export const createLike = (like) => {
    debugger
    return $.ajax({
        method: "POST",
        url: "/api/likes",
        data: { like },
        // contentType: false,
        // processData: false,
    });
  };

export const fetchLikes = () => {
    return $.ajax({
        method: "GET",
        url: "/api/likes",
    });
};

export const likesOf = (likeableType, likeableId, likes) => {
    debugger
    if (isEmpty(likes)) return [];
    const likeIds = Object.keys(likes).reverse;
    let output = [];
    debugger
    likeIds.forEach((likeId) => {
        if (likes.likeId.likeableType === likeableType || likes.likeId.likeableId === likeableId) {
            output.push(likes[likeId]);
        }
    })
    return output;
}

export const liked = (currentUser, likes) => {
    likes.forEach((like) => {
        if (like.likerId === currentUser.id) {
            debugger
            return true;
        }
    })
    debugger
    return false;
}
