Rails.application.routes.draw do
  #  login and create account routes
  post '/create_account', to: 'users#create_account'
  post '/login', to: 'users#login_user'

  # get user profile
  get '/me', to: 'users#me'

  # post routes
  
  get 'posts', to: 'posts#fetch_posts'
  post 'post/create', to: 'posts#create_post'
  post 'post/update/:id', to: 'posts#update_post'
  delete 'post/delete/:id', to: 'posts#delete_post'

end
