export const createSong = (song) => {
  return $.ajax({
    method: "POST",
    url: "/api/songs",
    data: song,
    contentType: false,
    processData: false,
  });
};

export const fetchSong = (id) => {
  return $.ajax({
    method: "GET",
    url: `/api/songs/${id}`,
  });
};

export const fetchSongs = () => (
  $.ajax({
    method: "GET",
    url: "/api/songs",
  })
);

const isEmpty = (obj) => {
  for (let key in obj) {
      if (obj.hasOwnProperty(key)) return false;
  }
  return true;
}

export const latest = (n, songs) => {
  if (isEmpty(songs)) return [];
  const keys = Object.keys(songs).reverse().slice(0, n);
  let output = [];
  keys.forEach((key) => {
    output.push(songs[key]);
  });
  return output;
};

export const shuffle = (n, songs) => {
  let songsToShuffle= latest(n, songs);
  for (let i = songsToShuffle.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      // debugger
      [songsToShuffle[i], songsToShuffle[j]] = [songsToShuffle[j], songsToShuffle[i]];
  }
  return songsToShuffle;
};

