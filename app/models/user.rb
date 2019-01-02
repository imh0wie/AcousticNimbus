class User < ApplicationRecord
  validates :username, :password_digest, :session_token, presence: true
  validates :username, :session_token, uniqueness: true
  validates :password, length: { minimum: 6 }, allow_nil: true

  has_many :songs, {
    foreign_key: :artist_id,
    class_name: :Song,
    dependent: :destroy,
  }

  has_many :likes, dependent: :destroy
  has_many :comments, dependent: :destroy

  has_many :attentions, {
    foreign_key: :followed_user_id,
    class_name: :Follow,
    dependent: :destroy,
  }

  has_many :followers, {
    through: :attentions,
    source: :follower,
    dependent: :destroy,
  }

  has_many :interests, {
    foreign_key: :follower_id,
    class_name: :Follow,
    dependent: :destroy,
  }
  
  has_many :followings, {
    through: :interests,
    source: :followed_user,
    dependent: :destroy,
  }

  after_initialize :ensure_session_token!
  attr_reader :password

  def self.find_by_credentials(username, password)
    user = User.find_by(username: username)
    user && user.is_password?(password) ? user : nil
  end

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def is_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end

  def reset_session_token!
    self.session_token = SecureRandom.urlsafe_base64
    self.save!
    self.session_token
  end

  def followers_count
    self.followers.size
  end
  
  def followings_count
    self.followings.size
  end

  def songs_count
    self.songs.size
  end

  def follower_ids
    # debugger
    # followers = self.followers
    # followers = []
    # # self.joins(:attentions).pluck('attentions.follower_id')
    # followers.each do |attention|
    #   follower_ids << attention.followerid
    # end
  end
  private

  def ensure_session_token!
    self.session_token ||= SecureRandom.urlsafe_base64
  end
end
