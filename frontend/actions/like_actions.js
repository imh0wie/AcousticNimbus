import * as LikeAPIUtil from "../util/like_api_util";

export const RECEIVE_LIKES = "RECEIVE_LIKES";

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
// ,
//         (errors) => {
//           return dispatch(receiveLikesErrors(errors.responseJSON));
//         },

