require "rails_helper"

RSpec.describe CategoriesController, type: :controller do
  include TestHelpers
  it { should respond_to(:fetch_categories) }
  it { should respond_to(:show_category) }

  let(:user) do
    User.create(name: "test", email: "test@example.com", password: "test")
  end

  let!(:category) { Category.create(name: "test category") }
  let!(:valid_post) do
    user.posts.create(
      title: "test post",
      content:
        "make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      category: category,
      tag_names: "test tag"
    )
  end

  # let(:category)

  describe " categories controller request ", type: :request do
    before { @token_header = sign_in_user(user) }
    describe "GET /categories" do
      context "when logged in" do
        before { get "/categories", headers: @token_header }
        it "should return an ok status code" do
          expect(response).to have_http_status(:ok)
        end

        it "should return a message post " do
          expect(JSON.parse(response.body)["message"]).to eq(
            "Categories fetched successfully"
          )
        end
      end

      context "when not logged in" do
        before { get "/categories" }
        it " should return unauthorized status code when not logged in" do
          expect(response).to have_http_status(:unauthorized)
        end
      end
    end

    describe "GET /categories/:id" do
      context "when the category exists" do
        before { get "/category/#{category.id}", headers: @token_header }
        it "should return an ok status code" do
          expect(response).to have_http_status(:ok)
        end

        it "should return the post associated with the category" do
          expect(
            JSON.parse(response.body)["body"]["category"]["posts"]
          ).to_not be_empty
        end
        it "should return a message post " do
          expect(JSON.parse(response.body)["message"]).to eq(
            "Category found successfully"
          )
        end
      end

      context "when the category does not exist" do
        before { get "/category/0", headers: @token_header }
        it "should return a not found status code" do
          expect(response).to have_http_status(:not_found)
        end

        it "should return a message not found* " do
          expect(JSON.parse(response.body)["message"]).to eq("Category not found")
        end
      end
    end
  end
end
