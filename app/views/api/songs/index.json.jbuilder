json.set! :followedSongs do
  @followed_songs.each do |song|
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
      json.likes do
        json.array! song.likes do |like|
          json.id like.id
          json.likeableType like.likeable_type
          json.likeableId like.likeable_id
          json.likerId like.liker_id
        end
      end
      json.likers song.likes.map { |like| like.liker_id }
      json.likesCount song.likes_count
      json.commentsCount song.comments_count
      json.createdAt song.created_at
    end 
  end
end