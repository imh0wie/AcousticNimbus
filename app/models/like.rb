class Like < ApplicationRecord
  validates :liker_id, :likeable_id, :likeable_type, presence: true
  validates :likeable_type, inclusion: { in: ["song", "playlist"] }
  validates :liker_id, uniqueness: { scope: [:likeable_id, :likeable_type] }
  # validates_uniqueness_of :liker_id, scope: [:likeable_id, :likeable_type] }

  belongs_to :liker
  belongs_to :song
end
