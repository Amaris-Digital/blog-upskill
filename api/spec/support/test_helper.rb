module TestHelpers
  require 'jwt'

  def sign_in_user(user)
    # Generate a token for the user
    jwt_secret = Rails.application.credentials.JWT_SECRET_KEY
    token = JWT.encode({ user_id: user.id }, jwt_secret, "HS256")
    
    headers = { content_type: 'application/json' }
    headers["Authorization"] = "Bearer #{token}"  
    headers
  end

end
