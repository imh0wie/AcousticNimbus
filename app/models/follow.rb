class Follow < ApplicationRecord
  validates :followed_user_id, :follower_id, presence: true
  validates [:followed_user_id, :follower_id], uniqueness: true

  belongs_to :followed_user,
    foreign_key: :followed_user_id,
    class_name: :User

  belongs_to :follower,
    foreign_key: :follower_id,
    class_name: :User
end
