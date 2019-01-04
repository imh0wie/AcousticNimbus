import * as UserAPIUtil from '../util/user_api_util';

export const RECEIVE_RANDOM_THREE_USERS = 'RECEIVE_RANDOM_THREE_USERS';
export const EMPTY_RANDOM_THREE_USERS = 'EMPTY_RANDOM_THREE_USERS';
export const RECEIVE_USER = 'RECEIVE_USER';

export const fetchUsers = () => {
    return (dispatch) => {
        return UserAPIUtil.fetchUsers().then(
            (usersFromServer) => {
                return dispatch(receiveRandomThreeUsers(usersFromServer));
            }
        );
    }
};

export const fetchThreeRandomUsers = (currentUserId) => {
    return (dispatch) => {
        return UserAPIUtil.fetchThreeRandomUsers(currentUserId).then(
            (usersFromServer) => {
                return dispatch(receiveRandomThreeUsers(usersFromServer));
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

export const receiveRandomThreeUsers = (users) => {
    return {
        type: RECEIVE_RANDOM_THREE_USERS,
        users: users,
    }
}

export const emptyRandomThreeUsers = (defaultState) => {
    return {
        type: EMPTY_RANDOM_THREE_USERS,
        defaultState: defaultState,
    }
}

