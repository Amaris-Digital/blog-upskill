class TagSerializer < ActiveModel::Serializer
  attributes :id, :name
  has_many :posts, serializer: PostSerializer
end
