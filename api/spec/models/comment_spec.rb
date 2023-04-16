require "rails_helper"

RSpec.describe Comment, type: :model do
  describe "attributes" do
    it { should respond_to(:body) }
    it { should respond_to(:user_id) }
    it { should respond_to(:post_id) }
  end

  describe "validations" do
    it { should validate_presence_of(:body) }
    it { should validate_presence_of(:user_id) }
    it { should validate_presence_of(:post_id) }
    it { should validate_length_of(:body).is_at_least(5) }
    # it { should validate_uniqueness_of(:user_id).scoped_to(:post_id) }

    it "only allows one comment per user per post" do
      category = Category.create(name: "testing")

      user =
        User.create(
          name: "John Doe",
          email: "john.doe@example.com",
          password: "password"
        )
      post =
        Post.create(
          title: "Post Title",
          content: "Post Content",
          user: user,
          category: category
        )
      comment1 = Comment.create(body: "Comment 1", user: user, post: post)
      comment2 = Comment.new(body: "Comment 2", user: user, post: post)
      expect(comment2).not_to be_valid
    end
  end

  describe "associations" do
    it { should belong_to(:user) }
    it { should belong_to(:post) }
  end
end
