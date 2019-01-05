defaultState = {}

if @followed_songs.length === 0
  json.followedSongs defaultState
else
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
        json.likesCount song.likes_count
        json.commentsCount song.comments_count
        json.createdAt song.created_at
      end 
    end
  end
end

if @liked_songs.length === 0
  json.likedSongs defaultState
else
  json.set! :likedSongs do
    @liked_songs.each do |song|
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
        json.likesCount song.likes_count
        json.commentsCount song.comments_count
        json.createdAt song.created_at
      end 
    end
  end
end