class Song < ApplicationRecord
  validates :title, :genre, :release_date, :availability, :artist_id, :playlist_id, presence: true

  has_many :likes
  has_one_attached :song
end
