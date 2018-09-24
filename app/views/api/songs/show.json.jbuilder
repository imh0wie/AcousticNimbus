json.song do
  json.id @song.id
  json.title @song.title
  json.genre @song.genre
  json.description @song.description
  json.artist @song.artist.username
  json.audioURL @song.audio_url
  json.imageURL @song.image_url
end
