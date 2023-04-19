module TestHelpers
  require 'jwt'

  def sign_in_user(user)
    # Generate a token for the user
    token = JWT.encode({ user_id: user.id }, "my_secret", "HS256")
    
    headers = { content_type: 'application/json' }
    headers["Authorization"] = "Bearer #{token}"  
    headers
  end

end
