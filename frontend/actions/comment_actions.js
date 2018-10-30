import * as CommentAPIUtil from "../util/comment_api_util";
export const RECEIVE_COMMENTS = "RECEIVE_COMMENTS";

export const createComment = (commentToServer) => {
    return dispatch => {
        return CommentAPIUtil.createComment(commentToServer).then(
            (commentsFromServer) => {
                dispatch(receiveLikes(commentsFromServer));
            }
        );
    }
}

export const removeComment = (idToServer) => {
    return dispatch => {
        return CommentAPIUtil.removeComment(idToServer).then(
            (commentsFromServer) => {
                return dispatch(receiveComments(commentsFromServer));
            }
        );
    }
}

const receiveComments = (comments) => {
    return {
        type: RECEIVE_COMMENTS,
        comments: comments
    }
}