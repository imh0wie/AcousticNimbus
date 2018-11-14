
@songs.each do |song|
  json.set! song.id do
    json.id song.id
    json.title song.title
    json.genre song.genre
    json.description song.description
    json.availability song.availability
    json.artist song.artist.username
    json.artistId song.artist.id
    json.imageURL song.image_url
    json.audioURL song.audio_url
    json.createdAt song.created_at
  end 
end 
