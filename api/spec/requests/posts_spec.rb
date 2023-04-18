require "rails_helper"

RSpec.describe PostsController, type: :controller do
  include TestHelpers

  describe "it should have these methods" do
    it { should respond_to(:fetch_posts) }
    it { should respond_to(:create_post) }
    it { should respond_to(:update_post) }
    it { should respond_to(:destroy_post) }
    it { should respond_to(:show_post) }
  end

  describe "post controller requests", type: :request do
    let(:user) do
      User.create(name: "test", email: "test@example.com", password: "test")
    end
    let(:category_name) { "Tosh on Steroids" }
    let(:tag_names) { "tosh, drugs" }
    let(:valid_post) do
      {
        title: "Tosh on Steroids",
        content:
          " is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        category_name: category_name,
        tag_names: tag_names
      }
    end
    let(:invalid_post) do
      {
        title: "Tosh on Steroids",
        content: "",
        category_name: "",
        tag_names: tag_names
      }
    end

    before { @token_header = sign_in_user(user) }

    describe "GET /posts" do
      it "returns a successful get for posts" do
        get "/posts", headers: @token_header
        expect(response).to have_http_status(:ok)
      end
    end

    describe "POST /post/create" do
      context "with valid attributes" do
        before do
          post "/post/create", params: valid_post, headers: @token_header
        end
        it "returns a created status code" do
          expect(response).to have_http_status(:created)
        end

        it "return a message in the response body" do
          expect(JSON.parse(response.body)["message"]).to eq(
            "Post created successfully"
          )
        end
      end

      context "with invalid attributes" do
        before do
          post "/post/create", params: invalid_post, headers: @token_header
        end

        it "returns an unprocessable entity status code" do
          expect(response).to have_http_status(:unprocessable_entity)
        end

        it "retuns errors in the response body" do
          expect(JSON.parse(response.body)["body"]["errors"]).to_not be_empty
        end
      end

      context "with balid attribute but is not logged in" do
        before { post "/post/create", params: valid_post }

        it "returns an unauthorized status code" do
          expect(response).to have_http_status(:unauthorized)
        end

        it "returns an error message in the response body" do
          expect(JSON.parse(response.body)["message"]).to eq("Unauthorized")
        end
      end
    end

    describe "GET /post/show/:id" do
      before do
        post "/post/create", params: valid_post, headers: @token_header
        @post_id = JSON.parse(response.body)["body"]["post"]["id"]
      end

      context "when a post is found" do
        before do
          get "/post/show/#{@post_id}",
              params: valid_post,
              headers: @token_header
        end

        it "returns an ok status code" do
          expect(response).to have_http_status(:ok)
        end
      end

      context "when a post is not found" do
        before do
          get "/post/show/#{"invalid"}",
              params: valid_post,
              headers: @token_header
        end

        it "returns a not found status code" do
          expect(response).to have_http_status(:not_found)
        end
      end
    end

    describe "PUT /post/edit/:id" do
      before do
        post "/post/create", params: valid_post, headers: @token_header
        @post_id = JSON.parse(response.body)["body"]["post"]["id"]
      end

      context "with valid attributes" do
        before do
          put "/post/edit/#{@post_id}",
              params: valid_post,
              headers: @token_header
        end

        it "returns a ok status code" do
          expect(response).to have_http_status(:ok)
        end
      end
    end

    describe "delete /post/delete/:id" do
      before do
        post "/post/create", params: valid_post, headers: @token_header
        @post_id = JSON.parse(response.body)["body"]["post"]["id"]
      end

      context "when a post is found" do
        before do
          delete "/post/delete/#{@post_id}",
                 params: valid_post,
                 headers: @token_header
        end

        it "returns a no content status code" do
          expect(response).to have_http_status(:no_content)
        end
      end

      context "when a post is not found" do
        before do
          delete "/post/delete/#{"invalid"}",
                 params: valid_post,
                 headers: @token_header
        end

        it "returns a not found status code" do
          expect(response).to have_http_status(:not_found)
        end
      end
    end
  end
end
