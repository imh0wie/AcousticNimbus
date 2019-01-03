@current_likes.each do |like|
  json.set! like.id do
    json.id like.id
    json.likerId like.liker_id
    json.likeableType like.likeable_type
    json.likeableId like.likeable_id
    json.set! :likeable do
      json.likesCount like.likeable.likes_count
      json.commentsCount like.likeable.comments_count
    end
  end 
end 
