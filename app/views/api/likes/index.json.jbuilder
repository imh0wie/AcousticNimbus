@likes.each do |like|
  json.set! like.id do
    json.id like.id
    json.likeableType like.likeable_type
    json.likeableId like.likeable_id
    json.likerId like.liker_id
  end 
end 
