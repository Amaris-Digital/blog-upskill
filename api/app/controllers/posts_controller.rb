class PostsController < ApplicationController

    before_action :authorized

    def fetch_posts
        posts = Post.all.map{ |post| PostSerializer.new(post) }
        posts ? posts_fetched(data: { posts: posts}) : posts_fetched(success: false)
    end

    def create_post
        category_name = params[:category_name]
        category = Category.find_or_create_by(name: category_name)

        tag_names = params[:tag_names].split(', ')
        tags = tag_names.map { |tag_name| Tag.find_or_create_by(name: tag_name) }

        post = @current_user.posts.new(post_params)
        post.category_id = category.id
        post.tags = tags

        if post.save
            post_created(data: { post: PostSerializer.new(post) })
        else
            post_created(success: false, data: { errors: post.errors.full_messages })
        end
    end

    def update_post

    end

    def destroy_post

    end


    private

    def post_params
        params.permit(:title, :content, :tag_names, :category_name, :user)
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

end
