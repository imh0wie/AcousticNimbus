defaultState = {}

json.set! :commentsOfSpecificSong do
  json.set! @song_id do
    if @comments_of_specific_song.length === 0
      json.commentsOfSpecificSong defaultState
    else
      @comments_of_specific_song.each do |comment|
        json.set! comment.id do
          json.id comment.id
          json.body comment.body
          json.songId comment.song_id
          json.songProgress comment.song_progress
          json.set! :commenter do
            json.id comment.commenter.id
            json.username comment.commenter.username
          end
          json.createdAt comment.created_at
        end
      end
    end
  end
end