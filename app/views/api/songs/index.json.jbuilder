@songs.each do |song|
  json.set! song.id do
    json.id song.id
    json.title song.title
    json.genre song.genre
    json.description song.description
    json.availability song.availability
    json.artist song.artist.username
    json.image_url song.image_url
    json.audio_url song.audio_url
  end 
end 
