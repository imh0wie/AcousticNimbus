class Like < ApplicationRecord
  validates :likeable_type, :likeable_id, :liker_id, presence: true
  validates :likeable_type, inclusion: { in: ["Song",  "Playlist"], message: "%{value} is not a valid likeable type" }
  # validates :liker, uniqueness: { scope: [:likeable_type, :likeable_id] }
  validates :liker_id, uniqueness: { scope: [:likeable_type, :likeable_id] }
  # validates_uniqueness_of :liker_id, scope: [:likeable_id, :likeable_type] }

  belongs_to :likeable, :polymorphic => true
  belongs_to :liker, {
    foreign_key: :liker_id,
    class_name: :User,
  }
end
