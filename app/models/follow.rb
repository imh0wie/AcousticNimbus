class Follow < ApplicationRecord
  validates :followed_user_id, :follower_id, presence: true
  validates [:followed_user_id, :follower_id], uniqueness: true

  belongs_to: :followed_user
  belongs_to: :follower
end
