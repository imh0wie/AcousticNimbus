defaultState = {}
if @song
  json.set! :individualSong do
    json.set! @song.id do
      json.id @song.id
      json.title @song.title
      json.genre @song.genre
      json.description @song.description
      json.availability @song.availability
      json.set! :artist do
        json.id @song.artist.id
        json.username @song.artist.username
        if @song.artist.attentions.length === 0
            json.attentions defaultState
        else
            json.set! :attentions do
                @song.artist.attentions.each do |attention|
                    json.set! attention.followed_user_id do
                        json.id attention.id
                        json.followedUserId attention.followed_user_id
                        json.followerId attention.follower_id
                    end
                end
            end
        end
        json.followersCount @song.artist.followers_count
        json.followingsCount @song.artist.followings_count
        json.songsCount @song.artist.songs_count
      end
      json.imageURL @song.image_url
      json.audioURL @song.audio_url
      if @song.likes.length === 0
        json.likes defaultState
      else
        json.set! :likes do
          @song.likes.each do |like|
            json.set! like.liker_id do
              json.id like.id
              json.likeableId like.likeable_id
              json.likerId like.liker_id
            end
          end
        end
      end
      if @likers_of_song.length === 0
        json.likers defaultState
      else
        json.set! :likers do
          @likers_of_song.each do |liker|
            json.set! liker.id do
              json.id liker.id
              json.username liker.username
            end
          end
        end
      end
      json.likesCount @song.likes_count
      json.commentsCount @song.comments_count
      json.createdAt @song.created_at
    end
  end
else
  json.individualSong defaultState
end