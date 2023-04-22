module TestHelpers

  def sign_in_user(user)
    post('/login', params: { email: user.email, password: user.password })
    token = JSON.parse(response.body)["body"]["token"]
    
    headers = { content_type: 'application/json' }
    headers["Authorization"] = "Bearer #{token}"  
    headers
  end

end
