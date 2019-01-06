# json.partial! "api/users/user", user: @user
json.set! @user.id do
    json.id @user.id
    json.username @user.username
    # json.imageURL @user.image_url
    json.followersCount @user.followers_count
    json.followingsCount @user.followings_count
    json.songsCount @user.songs_count
end 