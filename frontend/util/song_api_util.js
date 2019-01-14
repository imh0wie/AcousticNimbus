export const createSong = (song) => {
  debugger
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
    // data: {
    //   number: data.number,
    //   offset: data.offset,
    //   genre: data.genre,
    //   order: data.order,
    //   current_user_id: data.currentUserId,
    //   user_id: data.userId,
    //   fetching_followed_songs: data.fetching_followed_songs,
    //   fetching_liked_songs: data.fetching_liked_songs,
    // }
  });
};

// export const fetchFollowedAndLikedSongs = (userId) => {
//   return $.ajax({
//     method: "GET",
//     url: "/api/songs",
//     data: {
//       current_user_id: userId,
//       fetching_followed_songs: true,
//       fetching_liked_songs: true,
//     },
//   });
// };

// export const fetchFollowedSongs = (userId) => {
//   return $.ajax({
//     method: "GET",
//     url: "/api/songs",
//     data: {
//       current_user_id: userId,
//       fetching_followed_songs: true,
//       fetching_liked_songs: false,
//     },
//   });
// };

// export const fetchLikedSongs = (userId) => {
//   return $.ajax({
//     method: "GET",
//     url: "/api/songs",
//     data: {
//       current_user_id: userId,
//       fetching_followed_songs: false,
//       fetching_liked_songs: true,
//     },
//   });
// };

// export const fetchSongsOfSpecificUser = (userId) => {
//   return $.ajax({
//     method: "GET",
//     url: "/api/songs",
//     data: {
//       user_id: userId
//     }
//   });
// };

// export const fetchRelatedSongsByGenre = (songData) => {
//   return $.ajax({
//     method: "GET",
//     url: "/api/songs",
//     data: {
//       genre: songData.genre,
//       song_id: songData.songId,
//     }
//   });
// };

// export const fetchSongsOf = (userId) => {
//   return $.ajax({
//     method: "GET",
//     url: "/api/songs",
//     data: {
//       user_id: userId
//     }
//   });
// };

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

export const songsOf = (userId, songs) => {
  if (!songs || !userId) return null;
  const output = [];
  const songIds = Object.keys(songs).reverse();
  songIds.forEach((songId) => {
    const id = parseInt(songId);
    const song = songs[id];
    if (userId === song.artistId) output.push(song);
  })
  return output;
};

export const songsLikedBy = (userId, songs, likes) => {
  if (!likes || !songs) return null;
  const output = [];
  const likeIds = Object.keys(likes);
  likeIds.forEach((likeId) => {
      const like = likes[likeId];
      if (like.likeableType === "Song" && like.likerId === userId) output.push(songs[like.likeableId]);
  })
  return output;
};

export const relatedSongsOf = (targetSongId, songs) => {
  if (!songs) return null;
  const output = [];
  const songIds = Object.keys(songs);
  songIds.forEach((songId) => {
    const song = songs[songId];
    if (song.genre === songs[targetSongId].genre) output.push(song);
  })
  return output;
};

export const likedSongsJsonToArr = (songs) => {
  if (!songs) return null;
  const output = Object.values(songs.likedSongs);
  return output;
};

// const isEmpty = (obj) => {
//   for (let key in obj) {
//       if (obj.hasOwnProperty(key)) return false;
//   }
//   return true;
// }