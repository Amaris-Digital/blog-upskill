class UsersController < ApplicationController
  def create_account
    user =
      User.create(
        name: user_params[:name],
        email: user_params[:email],
        password: user_params[:password]
      )
    if user.valid?
      token = encode_data({ user_id: user.id })
      account_created(data: { user: user, token: token })
    else
      account_created(
        success: false,
        data: {
          errors: user.errors.full_messages
        }
      )
    end
  end

  def login_user
    user = User.find_by(email: user_params[:email])
    if user && user.authenticate(user_params[:password])
      token = encode_data({ user_id: user.id })
      account_login(data: { user: user, token: token })
    else
        account_login(success: false)
    end
  end

  private

  def user_params
    params.permit(:name, :email, :password)
  end

  def account_created(success: true, data: nil)
    app_response(
      status: success ? :created : :unprocessable_entity,
      message:
        success ? "Account created successfully" : "Account creation failed",
      body: data
    )
  end

  def account_login(success: true, data: nil)
    app_response(
      status: success ? :ok : :unprocessable_entity,
      message: success ? "Login successful" : "Login failed",
      body: data
    )
  end
end
