class Comment < ApplicationRecord
  # ensure most recent comments are returned first
  default_scope { order(created_at: :desc) }

  belongs_to :post
  belongs_to :user

  #validates :user_id, presence: true, uniqueness: { scope: :post_id } # a user can only comment on a post once
  validates :body, presence: true, length: { minimum: 5 }
end
