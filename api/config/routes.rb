Rails.application.routes.draw do
  #  login and create account routes
  post '/create_account', to: 'users#create_account'
  post '/login', to: 'users#login'

end
