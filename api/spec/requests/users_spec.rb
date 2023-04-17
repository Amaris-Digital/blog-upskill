require "rails_helper"

RSpec.describe UsersController, type: :controller do
  include TestHelpers
  describe "controller hac]s valid methods" do
    it { is_expected.to respond_to(:login_user) }
    it { is_expected.to respond_to(:create_account) }
    it { is_expected.to respond_to(:me) }
  end

  describe "Authentication", type: :request do
    describe "Post /create_account" do
      let(:valid_attributes) do
        { name: "test", email: "test@example.com", password: "test" }
      end
      let(:invalid_attributes) { { name: "invalid", email: "", password: "" } }

      context "with valid credentials" do
        before { post "/create_account", params: valid_attributes }

        it "returns an created status code" do
          expect(response).to have_http_status(:created)
        end

        it "returns an authentication token" do
          expect(JSON.parse(response.body)["body"]["token"]).not_to be_nil
        end
      end

      context "with invalid credentials" do
        before { post "/create_account", params: invalid_attributes }

        it "responds with a unprocessable entity status code" do
          expect(response).to have_http_status(:unprocessable_entity)
        end

        it "returns errors in the respponse body" do
          expect(JSON.parse(response.body)["body"]["errors"]).to_not be_empty
        end
      end

      context "duplicated data" do
        before do
          User.create(name: "test", email: "test@example.com", password: "test")
        end

        it "returns an unprocessable_entity status code" do
          post "/create_account", params: valid_attributes
          expect(response).to have_http_status(:unprocessable_entity)
        end
      end
    end

    describe "Post /login" do
      let(:user) do
        User.create(name: "test", email: "test@example.com", password: "test")
      end

      context "with valid credentials" do
        before do
          post "/login", params: { email: user.email, password: user.password }
        end

        it "returns an ok status code" do
          expect(response).to have_http_status(:ok)
        end

        it "returns an authentication token" do
          expect(JSON.parse(response.body)["body"]["token"]).not_to be_nil
        end
      end

      context "with invalid credentials" do
        before do
          post "/login", params: { email: user.email, password: "invalid" }
        end

        it "responds with a unprocessable entity status code" do
          expect(response).to have_http_status(:unprocessable_entity)
        end

        it "returns errors in the respponse body" do
          expect(JSON.parse(response.body)["message"]).to eq(
            "Login failed"
          )
        end
      end
    end
  end
end
