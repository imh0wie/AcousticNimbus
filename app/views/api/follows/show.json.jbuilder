defaultState = {}
if @interests.length === 0
  json.interests defaultState
else
  json.set! :interests do
    @interests.each do |interest|
      json.set! interest.followed_user_id do
        json.id interest.id
        json.followedUserId interest.followed_user_id
        json.followerId interest.follower_id
      end
    end
  end
end

if @attentions.length === 0
  json.attentions defaultState
else
  json.set! :attentions do
    @attentions.each do |attention|
      json.set! attention.followed_user_id do
        json.id attention.id
        json.followedUserId attention.followed_user_id
        json.followerId attention.follower_id
      end
    end
  end
end
