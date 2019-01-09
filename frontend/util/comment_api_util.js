import { isEmpty } from "./general_api_util";

export const createComment = (comment) => {
    return $.ajax({
        method: "POST",
        url: "/api/comments",
        data: {
            comment: comment,
            song_id: comment.song_id,
        },
    });
}

export const removeComment = (id, songId) => {
    return $.ajax({
        method: "DELETE",
        url: `/api/comments/${id}`,
        data: {
            id: id,
            song_id: songId,
        }
    })
}

export const fetchCommentsOfSpecificSong = (songId) => {
    return $.ajax({
        method: "GET",
        url: "/api/comments",
        data: {
            song_id: songId,
        }
    });
}

export const commentsOf = (songId, comments) => {
    if (!comments) return null;
    const output = [];
    const commentIds = Object.keys(comments);
    for (let i = 0; i < commentIds.length; i++) {
        const commentId = commentIds[i];
        const comment = comments[commentId];
        if (comment.songId === songId) output.unshift(comment);
    }
    return output;
}