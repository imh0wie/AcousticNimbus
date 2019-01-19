export const createSong = (song) => {
  return $.ajax({
    method: "POST",
    url: "/api/songs",
    data: song,
    contentType: false,
    processData: false,
  });
};

export const removeSong = (song) => {
  return $.ajax({
    method: "DELETE",
    url: `/api/songs/${song.id}`,
    data: song,
  });
};

export const fetchSong = (id) => {
  return $.ajax({
    method: "GET",
    url: `/api/songs/${id}`,
    data: {
      id: id,
    }
  });
};

export const fetchSongs = (data) => {
  return $.ajax({
    method: "GET",
    url: "/api/songs",
    data: data
  });
};

export const songsByCreationDate = (songs) => {
  return songs.sort((s1, s2) => {
    let id1 = s1.id;
    let id2 = s2.id;
    if (id1 < id2) {
      return -1;
    } else if (id1 > id2) {
      return 1;
    } else {
      return 0;
    }
  });
}
