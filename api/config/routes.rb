Rails.application.routes.draw do
  #  login and create account routes
  post '/create_account', to: 'users#create_account'
  post '/login', to: 'users#login_user'

  # get user profile
  get '/me', to: 'users#me'

  # post routes
  
  get '/posts', to: 'posts#fetch_posts'
  get '/post/show/:id', to: 'posts#show_post'
  post '/post/create', to: 'posts#create_post'
  put'/post/edit/:id', to: 'posts#update_post'
  delete '/post/delete/:id', to: 'posts#destroy_post'

end
