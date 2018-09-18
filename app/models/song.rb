class Song < ApplicationRecord
  validates :title, :availability, :artist_id, :playlist_id, presence: true
  validates :availability, inclusion: { in: [true, false] }

  has_many :likes
  has_one_attached :audio
end
