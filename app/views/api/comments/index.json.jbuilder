@comments.each do |comment|
  json.set! comment.id do
    json.id comment.id
    json.body comment.body
    json.songId comment.song_id
    json.songProgress comment.song_progress
    json.commenterId comment.commenter_id
  end 
end 
