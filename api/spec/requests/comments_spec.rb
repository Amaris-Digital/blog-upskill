require "rails_helper"

RSpec.describe CommentsController, type: :controller do
  include TestHelpers

  it { should respond_to(:create_comment) }
  it { should respond_to(:edit_comment) }
  it { should respond_to(:destroy_comment) }

  let!(:user) do
    User.create(name: "test", email: "test@example.com", password: "test")
  end
  let!(:category) { Category.create(name: "test category") }
  let!(:tag) { Tag.create(name: "test tag") }
  let!(:valid_post) do
    user.posts.create(
      title: "test post",
      content:
        "make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      category: category
    )
  end

  let(:comment) { { body: "test comment", user: user, post: valid_post } }
  let!(:valid_comment) do
    Comment.create(body: "test comment", user: user, post: valid_post)
  end

  before { @token_header = sign_in_user(user) }

  describe "comment controller request", type: :request do

    describe "POST /post/:post_id/comments" do
      context "with valid attributes" do
        before do
          post "/post/#{valid_post.id}/comments",
               params: comment,
               headers: @token_header
        end
        it "returns a created status code" do
          expect(response).to have_http_status(:created)
        end

        it "returns a message in the response body" do
          expect(JSON.parse(response.body)["message"]).to eq(
            "Comment created successfully"
          )
        end
      end

      context "with invalid attributes" do
        before do
          post "/post/#{valid_post.id}/comments",
               params: { body: "" },
               headers: @token_header
        end

        it "returns an unprocessable entity status code" do
          expect(response).to have_http_status(:unprocessable_entity)
        end

        it "has errots messages in the response body" do
          expect(JSON.parse(response.body)["body"]["errors"]).to_not be_empty
        end
      end
    end

    describe "PUT /comment/:id" do

      context "with valid attributes" do
        before do
          put "/comment/#{valid_comment.id}",
              params: { body: "updated comment" },
              headers: @token_header
        end

        it "returns a success status code" do
          expect(response).to have_http_status(:ok)
        end

        it "returns a message in the response body" do
          expect(JSON.parse(response.body)["message"]).to eq(
            "Comment updated successfully"
          )
        end
      end
      context "with invalid attributes" do
          before { put "/comment/#{valid_comment.id}", params: { body: "" }, headers: @token_header }

          it "returns an unprocessable entity status code" do
            expect(response).to have_http_status(:unprocessable_entity)
          end

          it "returns a message in the response body" do
            expect(JSON.parse(response.body)["message"]).to eq(
              "Comment update failed"
            )
          end
      end

      context "with valid attrinutes but not logged in" do
          before { put "/comment/#{valid_comment.id}", params: {body: ""} }
          
          it "returns an unauthorized status code" do
            expect(response).to have_http_status(:unauthorized)
          end

          it "returns an error message in the response body" do
            expect(JSON.parse(response.body)["message"]).to eq("Unauthorized")
          end
      end
    
    end

    describe "DELETE /comment/:id" do
      before { delete "/comment/#{valid_comment.id}", headers: @token_header }

      context "deletes successfully" do
        it "returns a success status code" do
          expect(response).to have_http_status(:ok)
        end

        it "returns a message in the response body" do
          expect(JSON.parse(response.body)["message"]).to eq("Comment deleted successfully")
        end
      end
    end
  end
end
