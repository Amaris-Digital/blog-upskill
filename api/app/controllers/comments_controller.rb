class CommentsController < ApplicationController
  before_action :authorized
  before_action :set_post, only: [:create_comment]
  before_action :set_comment, only: %i[edit_comment destroy_comment]

  def create_comment
    comment = @post.comments.build(comment_params)
    comment.user = @current_user

    if comment.save
        comment_created(data: { comment: CommentSerializer.new(comment) })
    else
        comment_created(success: false, data: { errors: comment.errors.full_messages })
    end
  end

  def edit_comment
    @comment.user = @current_user
    if @comment.update(comment_params)
      comment_updated(data: { comment: CommentSerializer.new(@comment) })
    else
      comment_updated(success: false, data: { errors: @comment.errors.full_messages })
    end
  end

  def destroy_comment
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
    @comment = Comment.find(params[:id])
  end

  def comment_params
    params.permit(:body)
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
end
