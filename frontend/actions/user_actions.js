import * as UserAPIUtil from '../util/user_api_util';

export const RECEIVE_RANDOM_THREE_USERS = 'RECEIVE_RANDOM_THREE_USERS';
export const RECEIVE_LIKERS_OF_SPECIFIC_SONG = 'RECEIVE_LIKERS_OF_SPECIFIC_SONG';
export const RECEIVE_FOLLOWERS_OF_SPECIFIC_USER = 'RECEIVE_FOLLOWERS_OF_SPECIFIC_USER';
export const RECEIVE_USER = 'RECEIVE_USER';
export const EMPTY_RANDOM_THREE_USERS = 'EMPTY_RANDOM_THREE_USERS';
export const EMPTY_INDIVIDUAL_USER = 'EMPTY_INDIVIDUAL_USER';
export const EMPTY_LIKERS_OF_SPECIFIC_SONG = 'EMPTY_LIKERS_OF_SPECIFIC_SONG';
export const EMPTY_FOLLOWERS_OF_SPECIFIC_USER = 'EMPTY_FOLLOWERS_OF_SPECIFIC_USER';

export const fetchUsers = () => {
    // return (dispatch) => {
    //     return UserAPIUtil.fetchUsers().then(
    //         (usersFromServer) => {
    //             return dispatch(receiveRandomThreeUsers(usersFromServer));
    //         }
    //     );
    // }
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

export const fetchLikersOfSpecificSong = (songIdToServer) => {
    return (dispatch) => {
        return UserAPIUtil.fetchLikersOfSpecificSong(songIdToServer).then(
            (usersFromServer) => {
                return dispatch(receiveLikersOfSpecificSong(usersFromServer));
            }
        )
    }
}

export const fetchFollowersOfSpecificUser = (userIdToServer) => {
    return (dispatch) => {
        return UserAPIUtil.fetchFollowersOfSpecificUser(userIdToServer).then(
            (usersFromServer) => {
                return dispatch(receiveFollowersOfSpecificUser(usersFromServer));
            }
        )
    }
}

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

export const receiveLikersOfSpecificSong = (users) => {
    return {
        type: RECEIVE_LIKERS_OF_SPECIFIC_SONG,
        users: users,
    }
}

export const receiveFollowersOfSpecificUser = (users) => {
    return {
        type: RECEIVE_FOLLOWERS_OF_SPECIFIC_USER,
        users: users,
    }
}

export const emptyRandomThreeUsers = (defaultState) => {
    return {
        type: EMPTY_RANDOM_THREE_USERS,
        defaultState: defaultState,
    }
}

export const emptyIndividualUser = (defaultState) => {
    return {
        type: EMPTY_INDIVIDUAL_USER,
        defaultState: defaultState,
    }
}

export const emptyLikersOfSpecificSong = (defaultState) => {
    return {
        type: EMPTY_LIKERS_OF_SPECIFIC_SONG,
        defaultState: defaultState,
    }
}

export const emptyFollowersOfSpecificUser = (defaultState) => {
    return {
        type: EMPTY_FOLLOWERS_OF_SPECIFIC_USER,
        defaultState: defaultState,
    }
}

