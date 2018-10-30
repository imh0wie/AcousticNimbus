import { isEmpty } from "./general_api_util";

export const createComment = (comment) => {
    return $.ajax({
        method: "POST",
        url: "/api/comments",
        data: {comment},
    });
}

export const removeComment = (id) => {
    return $.ajax({
        method: "DELETE",
        url: `/api/comments/${id}`,
    })
}

export const fetchComments = () => {
    return $.ajax({
        method: "GET",
        url: "/api/comments"
    })
}

export const commentsOf = (songId, comments) => {
    if (isEmpty(comments)) return [];
    const output = [];
    const commentIds = Object.keys(comments);
    for (let i = 0; i < commentIds.length; i++) {
        const commentId = commentIds[i];
        const comment = comments[commentId];
        if (comment.songId === songId) output.push(comment);
    }
    return output;
}