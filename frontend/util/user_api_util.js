export const fetchUser = (userId) => {
    return $.ajax({
        method: 'GET',
        url: `/api/users/${userId}`,
    });
};
  
export const editUser = (user, userId) => {
    return $.ajax({
        method: 'PATCH',
        url: `/api/users/${userId}`,
        data: user,
        contentType: false,
        processData: false,
    });
};
