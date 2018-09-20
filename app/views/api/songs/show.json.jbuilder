artist = @song.artist.username

json.song do
  json.id @song.id
  json.title @song.title
  json.genre @song.genre
  json.description @song.description
  json.artist artist
  json.audio @song.audio
  json.image @song.image
end
