class PostSerializer < ActiveModel::Serializer
  attributes :id, :title, :content, :user, :category, :tags, :comments
end
