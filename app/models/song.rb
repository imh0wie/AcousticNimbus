class Song < ApplicationRecord
  validates :title, :genre, :release_date, :availability, :artist_id, :playlist_id, presence: true
  validates :availability, , inclusion: { in: ["public", "private"] }

  has_many :likes
  has_one_attached :audio
end
