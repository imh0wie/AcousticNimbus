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