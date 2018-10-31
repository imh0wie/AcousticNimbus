class Comment < ApplicationRecord
    validates :body, :song_id, :song_progress, :commenter_id, presence: true
    
    belongs_to :commenter, {
        foreign_key: :commenter_id,
        class_name: :User
    }

    belongs_to :song, {
        foreign_key: :song_id,
        class_name: :Song
    }
end