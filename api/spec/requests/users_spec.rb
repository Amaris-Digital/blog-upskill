require "rails_helper"

RSpec.describe UsersController, type: :controller do
  describe "controller hac]s valid methods" do
    it { is_expected.to respond_to(:login_user) }
    it { is_expected.to respond_to(:create_account) }
  end

  describe "Authentication", type: :request do
    routes = %w[/create_account /login]
    headers = { "Content_Type" => "application/json" }
    sample_user = { name: "test", email: "test@example.com", password: "test" }

    it "handle account creation properly" do
      # with no params
      post(routes[0], headers: headers)
      expect(response).to have_http_status(:unprocessable_entity)

      # with valid data
      post(routes[0], params: sample_user, headers:)
      expect(response).to have_http_status(:created)
      
      # with duplicate data
      post(routes[0], params: sample_user, headers:)
      expect(response).to have_http_status(:unprocessable_entity)

      # with invalid data
      post(
        routes[0],
        params: {
          name: "test",
          email: "",
          password: "test"
        },
        headers:
      )
      expect(response).to have_http_status(:unprocessable_entity)
    end

    it "handle login properly" do
      User.create(sample_user)

      # user logins with correct credentials
      post(
        routes[1],
        params: {
          email: sample_user[:email],
          password: sample_user[ :password ]
        },
        headers:
      )
      expect(response).to have_http_status(:ok)

      # user login with correct email but wrong password
      post(
        routes[1],
        params: {
          email: sample_user[:email],
          password: "wrong"
        },
        headers:
      )
      expect(response).to have_http_status(:unprocessable_entity)
    end
  end
end
