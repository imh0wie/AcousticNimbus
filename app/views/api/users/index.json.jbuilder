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