import * as FollowAPIUtil from "../util/follow_api_util";

export const RECEIVE_FOLLOWS = "RECEIVE_FOLLOWS";

export const createFollow = (followToServer) => {
  return dispatch => {
    return FollowAPIUtil.createFollow(followToServer).then(
      (followsFromServer) => {
        return dispatch(receiveFollows(followsFromServer));
      }
    );
  };
};

export const removeFollow = (idToServer) => {
  return dispatch => {
    return FollowAPIUtil.removeFollow(idToServer).then(
      (followsFromServer) => {
        return dispatch(receiveFollows(followsFromServer));
      }
    )
  }
}

export const fetchFollows = () => {
    return (dispatch) => {
      return FollowAPIUtil.fetchFollows().then(
        (followsFromServer) => {
          return dispatch(receiveFollows(followsFromServer));
        }
      );
    };
};

const receiveFollows = (follows) => {
    return {
      type: RECEIVE_FOLLOWS,
      follows: follows,
    };
};