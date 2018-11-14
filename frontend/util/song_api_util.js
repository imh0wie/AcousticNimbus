import { isEmpty } from "./general_api_util";

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

export const fetchSongs = () => {
  return $.ajax({
    method: "GET",
    url: "/api/songs",
  });
};

export const latest = (n, songs) => {
  if (!songs) return null;
  let output = [];
  const songIds = Object.keys(songs).reverse().slice(0, n);
  songIds.forEach((songId) => {
    output.push(songs[songId]);
  })
  return output;
};

export const shuffle = (n, songs) => {
  let songsToShuffle = latest(n, songs);
  if (!songsToShuffle) return null;
  for (let i = songsToShuffle.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [songsToShuffle[i], songsToShuffle[j]] = [songsToShuffle[j], songsToShuffle[i]];
  }
  return songsToShuffle;
};

export const songsOf = (user, songs) => {
  debugger
  if (!songs || !user) return null;
  debugger
  const output = [];
  const songIds = Object.keys(songs).reverse();
  songIds.forEach((songId) => {
    const id = parseInt(songId);
    const song = songs[id];
    if (user.id === song.artistId) output.push(song);
  })
  return output;
}

export const songsLikedBy = (userId, songs, likes) => {
  if (!likes || !songs) return null;
  const output = [];
  const likeIds = Object.keys(likes);
  likeIds.forEach((likeId) => {
      const like = likes[likeId];
      if (like.likeableType === "Song" && like.likerId === userId) output.push(songs[like.likeableId]);
  })
  return output;
}

export const relatedSongsOf = (targetSongId, songs) => {
  if (!songs) return null;
  const output = [];
  const songIds = Object.keys(songs);
  songIds.forEach((songId) => {
    const song = songs[songId];
    if (song.genre === songs[targetSongId].genre) output.push(song);
  })
  return output;
}

// const isEmpty = (obj) => {
//   for (let key in obj) {
//       if (obj.hasOwnProperty(key)) return false;
//   }
//   return true;
// }