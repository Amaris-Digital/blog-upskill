module TestHelpers
  def sample_user
    { name: "test", email: "test@example.com", password: "test" }
  end

  def sign_in_user
    # Create a user
    user =
      User.create(
        name: "Test User",
        email: "test@example.com",
        password: "password"
      )

    # Generate a token for the user
    token = JsonWebToken.encode(user_id: user.id)

    # Set the Authorization header with the token
    request.headers["Authorization"] = "Bearer #{token}"
  end

  def auth_routes
    %w[/create_account /login]
  end

  def post_routes
    %w[/posts /post/show/:id /post/create /post/edit/:id /post/delete/:id]
  end

  def headers
    { "Content_Type" => "application/json" }
  end


end
