export const createSong = (song) => {
  debugger
  return $.ajax({
    method: "POST",
    url: "/api/songs",
    data: song, //純粹match route
    contentType: false,
    processData: false,
  });
};

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
