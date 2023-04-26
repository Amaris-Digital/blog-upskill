class CommentsController < ApplicationController
  before_action :authorized
  before_action :set_post, only: [ :create, :index ]
  before_action :set_comment, only: %i[update destroy]

  def index
    commet = @post.comments.map { |comment| CommentSerializer.new(comment) }
    if commet
      comment_fetched(data: { comments: commet })
    else
      comment_fetched(success: false)
    end

  end

  def create
    comment = @post.comments.build(comment_params)
    comment.user = @current_user

    if comment.save
        comment_created(data: { comment: CommentSerializer.new(comment) })
    else
        comment_created(success: false, data: { errors: comment.errors.full_messages })
    end
  end

  def update
    if @comment.update(comment_params)
      comment_updated(data: { comment: CommentSerializer.new(@comment) })
    else
      comment_updated(success: false, data: { errors: @comment.errors.full_messages })
    end
  end

  def destroy
    if @comment
        @comment.destroy
        comment_deleted
    else
        comment_deleted(success: false)
    end
  end

  private

  def set_post
    @post = Post.find_by(id: params[:post_id])
  end

  def set_comment
    @comment = @current_user.comments.find_by(id: params[:id])
  end

  def comment_params
    params.permit(:body, :post_id, :id )
  end

  def comment_created(success: true, data: nil)
    app_response(
      status: success ? :created : :unprocessable_entity,
      message:
        success ? "Comment created successfully" : "Comment creation failed",
      body: data
    )
  end

  def comment_updated(success: true, data: nil)
    app_response(
        status: success ? :ok : :unprocessable_entity,
        message: success ? "Comment updated successfully" : "Comment update failed",
        body: data
    )
  end

  def comment_deleted(success: true, data: nil)
    app_response(
        status: success ? :ok : :not_found,
        message: success ? "Comment deleted successfully" : "Comment not found",
        body: data
    )
  end

  def comment_fetched(success: true, data: nil)
    app_response(
      status: success ? :ok : :unprocessable_entity,
      message: success ? "Comment fetched successfully" : "Comments fetch failed",
      body: data
    )
  end
end
