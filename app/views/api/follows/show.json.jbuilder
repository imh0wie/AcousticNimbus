defaultState = {}

json.set! :interests do
  @interests.each do |interest|
    json.set! interest.followed_user_id do
      json.id interest.id
      json.followedUserId interest.followed_user_id
      json.followerId interest.follower_id
    end
  end
end

json.set! :attentions do
  @attentions.each do |attention|
    json.set! attention.follower_id do
      json.id attention.id
      json.followedUserId attention.followed_user_id
      json.followerId attention.follower_id
    end
  end
end
