class Song < ApplicationRecord
  validates :title, :availability, :artist_id, :audio_url, presence: true
  # validates :availability, inclusion: { in: [true, false] }
  # validates_attachment_content_type :audio, content_type: ['audio/aiff', 'audio/wav', 'audio/flac',
  #                                                          'audio/alac', 'audio/ogg', 'audio/mp2',
  #                                                          'audio/mp3', 'audio/aac', 'audio/amr',
  #                                                          'audio/wma']

  # validates_attachment_content_type content_type: ['image/jpg', 'image/png']

  belongs_to :artist, {
    foreign_key: :artist_id,
    class_name: :User
  }
  
  has_many :likes, {
    as: :likeable, 
    dependent: :destroy,
  }

  has_many :comments, {
    foreign_key: :song_id,
    class_name: :comment,
    dependent: :destroy,
  }

  has_one_attached :audio, dependent: :destroy
  
  has_one_attached :image, dependent: :destroy
  
  def song_likes
    self.likes.count
  end
  
  def song_comments
    self.comments.count
  end
  # def self.by_release_time
  #   self.select("songs.*").order("songs.created_at", DESC).limit(30)
  # end
end
