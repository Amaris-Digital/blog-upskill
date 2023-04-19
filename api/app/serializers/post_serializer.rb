class PostSerializer < ActiveModel::Serializer
  attributes :id, :title, :content, :created_at
  belongs_to :user, serializer: UserSerializer
  belongs_to :category, serializer: SingleCategorySerializer
  has_many :tags, serializer: TagSerializer
  has_many :comments , serializer: CommentSerializer
end
