@likes.each do |like|
  json.set! like.id do
    json.id like.id
    json.likerId like.liker_id
    json.likeableId like.likeable_id
    json.likeableType like.likeable_type
  end 
end 
