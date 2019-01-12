import * as LikeAPIUtil from "../util/like_api_util";

export const EMPTY_LIKES = "EMPTY_LIKES";
export const RECEIVE_EXTRA_LIKES = "RECEIVE_EXTRA_LIKES";
export const RECEIVE_LESS_LIKES = "RECEIVE_LESS_LIKES";

export const createLike = (likeToServer) => {
  return dispatch => {
    return LikeAPIUtil.createLike(likeToServer).then(
      (likesFromServer) => {
        return dispatch(receiveExtraLikes(likesFromServer));
      }
    );
  };
};

export const removeLike = (likeToServer) => {
  return dispatch => {
    return LikeAPIUtil.removeLike(likeToServer).then(
      (likesFromServer) => {
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

export const emptyLikes = (defaultState) => {
  return {
    type: EMPTY_LIKES,
    defaultState: defaultState,
  }

}

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
