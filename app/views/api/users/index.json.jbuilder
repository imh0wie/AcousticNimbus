defaultState = {}

if @recommended_users
  if @recommended_users.length === 0
    json.randomThree defaultState
  else
    json.set! :randomThree do
      @recommended_users.each do |user|
        break if !user
        json.set! user.id do
          json.id user.id
          json.username user.username
          # json.imageURL user.image_url
          json.followers user.followers.map { |follower| follower.id }
          json.followersCount user.followers_count
          json.followingsCount user.followings_count
          json.songsCount user.songs_count
        end
      end
    end
  end
end 

if @likers_of_specific_song
  if @likers_of_specific_song.length === 0
    json.likersOfSpecificSong defaultState
  else
    json.set! :likersOfSpecificSong do
      @likers_of_specific_song.each do |liker|
        break if !liker
        json.set! liker.id do
          json.id liker.id
          json.username liker.username
          # json.imageURL liker.image_url
          json.followers liker.followers.map { |follower| follower.id }
          json.followersCount liker.followers_count
          json.followingsCount liker.followings_count
          json.songsCount liker.songs_count
        end
      end
    end
  end
end 

if @followers_of_specific_user
  if @followers_of_specific_user.length === 0
    json.followersOfSpecificUser defaultState
  else
    json.set! :followersOfSpecificUser do
      @followers_of_specific_user.each do |follower|
        break if !follower
        json.set! follower.id do
          json.id follower.id
          json.username follower.username
          # json.imageURL follower.image_url
        end
      end
    end
  end
end 
