json.set! :bySong do
  @song_ids.each do |song_id|
    json.set! song_id do
      json.array! @comments do |comment|
        next if comment.song_id != song_id 
        json.id comment.id
        json.body comment.body
        json.songId comment.song_id
        json.songProgress comment.song_progress
        json.commenterId comment.commenter_id
        json.createdAt comment.created_at
      end
    end
  end
end