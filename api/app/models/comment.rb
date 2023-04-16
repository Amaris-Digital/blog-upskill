class Comment < ApplicationRecord
  belongs_to :post
  belongs_to :user

  validates :user_id, presence: true, uniqueness: { scope: :post_id } # a user can only comment on a post once
  validates :post_id, presence: true
  validates :body, presence: true, length: { minimum: 5 }
  
end
