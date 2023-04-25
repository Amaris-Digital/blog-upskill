class PostsController < ApplicationController
  before_action :authorized
  skip_before_action :authorized, only: [:index]

  def index
    posts = Post.all.map { |post| PostSerializer.new(post) }
    if posts
      posts_fetched(data: { posts: posts })
    else
      posts_fetched(success: false)
    end
  end

  def show
    post = Post.find_by(id: params[:id])

    if post
      post_found(data: { post: PostSerializer.new(post) })
    else
      post_found(success: false)
    end
  end

  def create
    category_name = params[:category_name]
    category = Category.find_or_create_by(name: category_name)

    tag_names =
      params[:tag_names].present? ? params[:tag_names].split(", ") : []
    tags = tag_names&.map { |tag_name| Tag.find_or_create_by(name: tag_name) }

    post = @current_user.posts.new(post_params)
    post.category_id = category.id
    post.tags = tags

    if post.save
      post_created(data: { post: PostSerializer.new(post) })
    else
      post_created(success: false, data: { errors: post.errors.full_messages })
    end
  end

  def update
    post = find_post

    category_name = params[:category_name] || post.category.name
    category = Category.find_or_create_by(name: category_name)

    tag_names =
      (
        if params[:tag_names].present?
          params[:tag_names].split(", ").uniq
        else
          post.tags.map(&:name)
        end
      )
    tags = tag_names&.map { |tag_name| Tag.find_or_create_by(name: tag_name) }

    if post.update(
         title: post_params[:title],
         content: post_params[:content],
         category: category,
         tags: tags
       )
      post_updated(data: { post: PostSerializer.new(post) })
    else
      post_updated(success: false, data: { errors: post.errors.full_messages })
    end
  end

  def destroy
    post = find_post

    if post
      post.destroy
      post_delete
    else
      post_delete(success: false)
    end
  end

  private

  def post_params
    params.permit(:title, :content, :tag_names, :category_name)
  end

  def post_created(success: true, data: nil)
    app_response(
      status: success ? :created : :unprocessable_entity,
      message: success ? "Post created successfully" : "Post creation failed",
      body: data
    )
  end

  def posts_fetched(success: true, data: nil)
    app_response(
      status: success ? :ok : :unprocessable_entity,
      message: success ? "Posts fetched successfully" : "Posts fetch failed",
      body: data
    )
  end

  def post_found(success: true, data: nil)
    app_response(
      status: success ? :ok : :not_found,
      message: success ? "Post found successfully" : "Post not found",
      body: data
    )
  end

  def find_post
    @current_user.posts.find_by(id: params[:id])
  end

  def post_updated(success: true, data: nil)
    app_response(
      status: success ? :ok : :unprocessable_entity,
      message: success ? "Post updated successfully" : "Post update failed",
      body: data
    )
  end

  def post_delete(success: true)
    app_response(
      status: success ? :no_content : :not_found,
      message: success ? "Post deleted successfully" : "Post deletion failed"
    )
  end
end
