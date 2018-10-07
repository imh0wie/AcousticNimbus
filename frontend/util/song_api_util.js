export const createSong = (song) => {
  return $.ajax({
    method: "POST",
    url: "/api/songs",
    data: song,
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

export const latestTwelve = (songs) => {
  const keys = Object.keys(songs).reverse().slice(0, 12);
  let output = [];
  keys.forEach((key) => {
    output.push(songs[key]);
  });
  return output;
};
