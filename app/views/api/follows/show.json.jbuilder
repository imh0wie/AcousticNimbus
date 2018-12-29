json.set! :byFollowedUserId do
  @follows.each do |follow|
    json.set! follow.followed_user_id do
      json.id follow.id
      json.followedUserId follow.followed_user_id
      json.followerId follow.follower_id
    end
  end
end