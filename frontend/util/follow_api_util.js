export const createFollow = (follow) => {
    return $.ajax({
        method: "POST",
        url: "/api/follows",
        data: { follow },
    });
};

export const removeFollow = (id) => {
    debugger
    return $.ajax({
        method: "DELETE",
        url: `/api/follows/${id}`,
    });
}

export const fetchFollows = () => {
    debugger
    return $.ajax({
        method: "GET",
        url: "/api/follows",
    });
};