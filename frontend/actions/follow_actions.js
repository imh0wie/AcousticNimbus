import * as FollowAPIUtil from "../util/follow_api_util";

export const RECEIVE_FOLLOWS = "RECEIVE_FOLLOWS";
// export const RECEIVE_PERSONAL_FOLLOWS = "RECEIVE_PERSONAL_FOLLOWS";

export const createFollow = (followToServer) => {
  return dispatch => {
    return FollowAPIUtil.createFollow(followToServer).then(
      (followsFromServer) => {
        debugger
        return dispatch(receiveFollows(followsFromServer));
      }
    );
  };
};

export const removeFollow = (followToServer) => {
  return dispatch => {
    return FollowAPIUtil.removeFollow(followToServer).then(
      (followsFromServer) => {
        debugger
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

export const fetchFollowingsOf = (followerId) => {
    return (dispatch) => {
      return FollowAPIUtil.fetchFollowingsOf(followerId).then(
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