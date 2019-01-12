defaultState = {}
if @songs
  if @songs.length === 0
    json.introSongs defaultState
  else
    json.set! :introSongs do
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
end

if @followed_songs
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
end

if @liked_songs
  if @liked_songs.length === 0
    json.likedSongs defaultState
  else
    json.set! :likedSongs do
      @liked_songs.each_with_index do |song, i|
        like = @likes[i]
        json.set! like.id do
          json.id song.id
          json.title song.title
          # json.genre song.genre
          # json.description song.description
          # json.availability song.availability
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
          # json.createdAt song.created_at
        end 
      end
    end
  end
end

if @songs_of_specific_user
  if @songs_of_specific_user.length === 0
    json.songsOfSpecificUser defaultState
  else
    json.set! :songsOfSpecificUser do
      @songs_of_specific_user.each do |song|
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
end

if @liked_songs_of_specific_user
  if @liked_songs_of_specific_user.length === 0
    json.likedSongsOfSpecificUser defaultState
  else
    json.set! :likedSongsOfSpecificUser do
      @liked_songs_of_specific_user.each do |song|
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
end

if @related_songs_by_genre
  if @related_songs_by_genre.length === 0
    json.relatedSongsByGenre defaultState
  else
    json.set! :relatedSongsByGenre do
      @related_songs_by_genre.each do |song|
        break if !song
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
end