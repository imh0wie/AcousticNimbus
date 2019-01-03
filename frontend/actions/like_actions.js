import * as LikeAPIUtil from "../util/like_api_util";

export const RECEIVE_EXTRA_LIKES = "RECEIVE_EXTRA_LIKES";
export const RECEIVE_LESS_LIKES = "RECEIVE_LESS_LIKES";

export const createLike = (likeToServer) => {
  return dispatch => {
    return LikeAPIUtil.createLike(likeToServer).then(
      (likesFromServer) => {
        debugger
        return dispatch(receiveExtraLikes(likesFromServer));
      }
    );
  };
};

export const removeLike = (likeToServer) => {
  return dispatch => {
    return LikeAPIUtil.removeLike(likeToServer).then(
      (likesFromServer) => {
        debugger
        return dispatch(receiveLessLikes(likesFromServer));
      }
    )
  }
}

export const fetchLikes = () => {
    return (dispatch) => {
      return LikeAPIUtil.fetchLikes().then(
        (likesFromServer) => {
          return dispatch(receiveLikes(likesFromServer));
        }
      );
    };
};

const receiveExtraLikes = (likes) => {
    return {
      type: RECEIVE_EXTRA_LIKES,
      likes: likes,
    };
};

const receiveLessLikes = (likes) => {
    return {
      type: RECEIVE_LESS_LIKES,
      likes: likes,
    };
};
