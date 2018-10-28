import * as LikeAPIUtil from "../util/like_api_util";

export const RECEIVE_LIKES = "RECEIVE_LIKES";

export const createLike = (likeToServer) => {
  return dispatch => {
    return LikeAPIUtil.createLike(likeToServer).then(
      (likesFromServer) => {
        return dispatch(receiveLikes(likesFromServer));
      }
    );
  };
};

export const removeLike = (idToServer) => {
  return dispatch => {
    return LikeAPIUtil.removeLike(idToServer).then(
      (likesFromServer) => {
        return dispatch(receiveLikes(likesFromServer));
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

const receiveLikes = (likes) => {
    return {
      type: RECEIVE_LIKES,
      likes: likes,
    };
};
