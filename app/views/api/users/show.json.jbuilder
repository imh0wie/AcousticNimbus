# json.partial! "api/users/user", user: @user
defaultState = {}

json.set! @user.id do
    json.id @user.id
    json.username @user.username
    # json.imageURL @user.image_url
    if @user.attentions.length === 0
        json.attentions defaultState
    else
        json.set! :attentions do
            @user.attentions.each do |attention|
                json.set! attention.followed_user_id do
                    json.id attention.id
                    json.followedUserId attention.followed_user_id
                    json.followerId attention.follower_id
                end
            end
        end
    end
    @user.followers.map { |follower| follower.id }
    json.followersCount @user.followers_count
    json.followingsCount @user.followings_count
    json.songsCount @user.songs_count
end 