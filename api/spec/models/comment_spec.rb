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

    # it "only allows one comment per user per post" do
    #   # category = Category.create(name: "testing")

    #   user = User.create(name: "rspec", email: "rspec", password: "rspec")
    #   category = Category.create(name: "testing")
    #   tag = Tag.create(name: "tdd")
    #   post1 =
    #     user.posts.create(
    #       title: "rspec",
    #       content:
    #         "simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    #       category: category
    #     )

    #   comment1 = post1.comments.create(body: "Comment 1", user: user)
    #   comment2 = post1.comments.create(body: "Comment 1", user: user)

    #   expect(comment2).to_not be_valid
    # end
  end

  describe "associations" do
    it { should belong_to(:user) }
    it { should belong_to(:post) }
  end
end
