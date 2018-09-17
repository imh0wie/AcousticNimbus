json.songs do
  @songs.each do |song|
    json.set! song.id do
      json.info do
        json.song.title
        json.genre song.genre
        json.artist_id song.artist_id
        json.playlist_id song.playlist_id
      end
      # json.likes
      # .
      # .
      # .
    end
  end
end
