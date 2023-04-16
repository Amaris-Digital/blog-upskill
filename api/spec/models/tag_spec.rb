require "rails_helper"

RSpec.describe Tag, type: :model do
  describe "attributes" do
    it { should respond_to(:name) }

    describe "validations" do
      it { should validate_presence_of(:name) }
      it { should validate_uniqueness_of(:name) }
    end

    describe "associations" do
      it "has many posts through post tags" do
        user = User.create(name: "rspec", email: "rspec", password: "rspec")
        category = Category.create(name: "testing")
        tag = Tag.create(name: "tdd")
        post1 =
          user.posts.create(
            title: "rspec",
            content:
              "simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
            category: category
          )
        post1.post_tags.create(tag: tag)
        expect(tag.posts).to include(post1)
      end
    end
  end
end
