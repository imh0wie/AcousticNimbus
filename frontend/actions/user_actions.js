import * as UserAPIUtil from '../util/user_api_util';

export const RECEIVE_USER = 'RECEIVE_USER';
export const RECEIVE_USERS = 'RECEIVE_USERS';

export const fetchUsers = () => {
    return (dispatch) => {
        return UserAPIUtil.fetchUsers().then(
            (usersFromServer) => {
                return dispatch(receiveUsers(usersFromServer));
            }
        );
    }
};

export const fetchUser = (userId) => {
    return (dispatch) => {
        return UserAPIUtil.fetchUser(userId).then(
            (userFromServer) => {
                return dispatch(receiveUser(userFromServer));
            }
        );
    };
};

export const editUser = (userToServer, userId) => {
    return (dispatch) => {
        return UserAPIUtil.editUser(userToServer, userId).then(
            (userFromServer) => {
                return dispatch(receiveUser(userFromServer));
            }
        )
    };
};

export const receiveUser = (user) => {
    return {
        type: RECEIVE_USER,
        user: user,
    };
};

export const receiveUsers = (users) => {
    return {
        type: RECEIVE_USERS,
        users: users,
    }
}

