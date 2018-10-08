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

export const shuffle = (songs) => {
  let songsToShuffle= latestTwelve(songs);
  for (let i = songsToShuffle.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      // debugger
      [songsToShuffle[i], songsToShuffle[j]] = [songsToShuffle[j], songsToShuffle[i]];
  }
  debugger
  return songsToShuffle;
};
