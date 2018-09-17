export const createSong = (song) => (
  $.ajax({
    method: "POST",
    url: "/api/songs",
    data: {song: song},
  })
);

export const fetchSong = (song) => (
  $.ajax({
    method: "GET",
    url: `/api/songs/${song.id}`,
  })
);

export const fetchSongs = () => (
  $.ajax({
    method: "GET",
    url: "/api/songs",
  })
);
