class ApplicationController < ActionController::API
  # jwt authentication

  JWT_SECRET = Rails.application.credentials.JWT_SECRET_KEY

  def encode_data(payload)
    JWT.encode(payload, JWT_SECRET, "HS256")
  end

  def decode_data(token)
    JWT.decode(token, JWT_SECRET, true, { algorithm: "HS256" })
  rescue JWT::DecodeError
    nil
  end

  # returns a json response
  def app_response(status: 200, body: nil, message: nil)
    render json: { message: message, status: status, body: body }, status:
  end

  def authorized
    if current_user
      true
    else
      app_response(status: :unauthorized, message: "Unauthorized")
    end
  end

  #  returns the current user if the token is valid
  def current_user
    if request.headers["Authorization"].present?
      token = request.headers["Authorization"].split(" ").last
      decoded_token = decode_data(token)
      if decoded_token
        user_id = decoded_token[0]["user_id"]
        @current_user ||= User.find_by(id: user_id)
      end
    end
  end

end
