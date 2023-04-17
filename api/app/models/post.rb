class Post < ApplicationRecord
  # ensure most recent posts are shown first
  default_scope { order(created_at: :desc)}

  belongs_to :user
  belongs_to :category
  has_many :post_tags, dependent: :destroy
  has_many :tags, through: :post_tags
  has_many :comments, dependent: :destroy

  attr_accessor :tag_names, :category_name

  validates :title, presence: true, length: { minimum: 5 }
  validates :content, presence: true, length: { minimum: 100 }
  validates :category, presence: true

end
