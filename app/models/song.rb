class Song < ApplicationRecord
  validates :title, :availability, :artist_id, :audio_url, presence: true
  validates :availability, inclusion: { in: [true, false] }
  # validates_attachment_content_type :audio, content_type: ['audio/aiff', 'audio/wav', 'audio/flac',
  #                                                          'audio/alac', 'audio/ogg', 'audio/mp2',
  #                                                          'audio/mp3', 'audio/aac', 'audio/amr',
  #                                                          'audio/wma']

  # validates_attachment_content_type content_type: ['image/jpg', 'image/png']

  belongs_to :artist,
    foreign_key: :artist_id,
    class_name: :User
  has_many :likes
  has_one_attached :audio
  has_one_attached :image
end
