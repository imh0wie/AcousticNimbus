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
      json.likes do
        json.array! @song.likes do |like|
          json.id like.id
          json.likeableType like.likeable_type
          json.likeableId like.likeable_id
          json.likerId like.liker_id
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