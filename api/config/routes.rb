Rails.application.routes.draw do
  #  login and create account routes
  post "/create_account", to: "users#create_account"
  post "/login", to: "users#login_user"

  # get user profile
  get "/me", to: "users#me"

  # post routes
  resources :posts

  # comment routes
  post "/posts/:post_id/comments", to: "comments#create"
  get "/posts/:post_id/comments", to: "comments#index"
  resources :comments, only: %i[update destroy]

  # categories routes
  resources :categories, only: %i[index show]

  # tag routes
  resources :tags, only: %i[index show]
end
