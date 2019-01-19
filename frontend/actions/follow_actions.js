import * as FollowAPIUtil from "../util/follow_api_util";

export const RECEIVE_FOLLOWS = "RECEIVE_FOLLOWS";
export const EMPTY_FOLLOWS = "EMPTY_FOLLOWS";

export const createFollow = (followToServer) => {
  return dispatch => {
    return FollowAPIUtil.createFollow(followToServer).then(
      (followsFromServer) => {
        return dispatch(receiveFollows(followsFromServer));
      }
    );
  };
};

export const removeFollow = (followToServer) => {
  return dispatch => {
    return FollowAPIUtil.removeFollow(followToServer).then(
      (followsFromServer) => {
        return dispatch(receiveFollows(followsFromServer));
      }
    )
  }
}

export const emptyFollows = (defaultState) => {
  return {
    type: EMPTY_FOLLOWS,
    defaultState: defaultState,
  }
}

const receiveFollows = (follows) => {
    return {
      type: RECEIVE_FOLLOWS,
      follows: follows,
    };
};