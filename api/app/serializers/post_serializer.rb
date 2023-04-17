class PostSerializer < ActiveModel::Serializer
  attributes :id, :title, :content, :user, :category, :tags

  # belongs_to :user
  # belongs_to :category
  # has_many :tags
end
