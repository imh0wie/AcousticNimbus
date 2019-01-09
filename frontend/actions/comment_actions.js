import * as CommentAPIUtil from "../util/comment_api_util";
export const RECEIVE_COMMENTS = "RECEIVE_COMMENTS";
export const RECEIVE_EXTRA_COMMENTS = "RECEIVE_EXTRA_COMMENTS";
export const RECEIVE_LESS_COMMENTS = "RECEIVE_LESS_COMMENTS";
export const EMPTY_COMMENTS_OF_SPECIFIC_SONG = "EMPTY_COMMENTS_OF_SPECIFIC_SONG";

export const createComment = (commentToServer) => {
    return dispatch => {
        return CommentAPIUtil.createComment(commentToServer).then(
            (commentsFromServer) => {
                return dispatch(receiveComments(commentsFromServer));
            }
        );
    };
};

export const removeComment = (idToServer, songIdToServer) => {
    return dispatch => {
        return CommentAPIUtil.removeComment(idToServer, songIdToServer).then(
            (commentsFromServer) => {
                return dispatch(receiveComments(commentsFromServer));
            }
        );
    };
};

// export const fetchComments = () => {
//     return dispatch => {
//         return CommentAPIUtil.fetchComments().then(
//             (commentsFromServer) => {
//                 return dispatch(receiveComments(commentsFromServer));
//             }
//         );
//     };
// };

export const fetchCommentsOfSpecificSong = (songIdToServer) => {
    return dispatch => {
        return CommentAPIUtil.fetchCommentsOfSpecificSong(songIdToServer).then(
            (commentsFromServer) => {
                return dispatch(receiveComments(commentsFromServer));
            }
        );
    };
};

export const emptyCommentsOfSpecificSong = (defaultState) => {
    return {
        type: EMPTY_COMMENTS_OF_SPECIFIC_SONG,
        defaultState: defaultState,
    }
}

const receiveComments = (comments) => {
    return {
        type: RECEIVE_COMMENTS,
        comments: comments
    };
};

// const receiveExtraComments = (comments) => {
//     return {
//       type: RECEIVE_EXTRA_COMMENTS,
//       comments: comments,
//     };
// };

// const receiveLessComments = (comments) => {
//     return {
//       type: RECEIVE_LESS_COMMENTS,
//       comments: comments,
//     };
// };