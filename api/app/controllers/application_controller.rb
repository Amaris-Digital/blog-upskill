class ApplicationController < ActionController::API

    # jwt authentication

    def encode_data payload
        JWT.encode(payload, "my_secret", 'HS256')
    end

    def decode_data token
        JWT.decode(token, "my_secret", true, { algorithm: 'HS256' })
    rescue JWT::DecodeError
        nil
    end

    def app_response (status: 200, body:nil, message: nil)
        render json: {
            message: message, 
            status: status,
            body: body,
        }, 
        status:
    end

end
