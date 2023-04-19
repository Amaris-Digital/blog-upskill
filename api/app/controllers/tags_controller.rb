class TagsController < ApplicationController
    before_action :authorized
  
    def index
      tags =
        Tag.all.map { |tag| SingleTagSerializer.new(tag) }
      if tags
        tag_fetched(data: { tags: tags })
      else
        tag_fetched(success: false)
      end
    end
  
    def show
      tag = Tag.find_by(id: params[:id])
  
      if tag
        tag_found(data: { tag: TagSerializer.new(tag) })
      else
        tag_found(success: false)
      end
    end
  
    private
  
    def tag_fetched success: true, data: nil
      app_response(
        status: success ? :ok : :unprocessable_entity,
        message: success ? "Tags fetched successfully" : "Tag fetch failed",
        body: data
      )
    end
  
    def tag_found success: true, data: nil
      app_response(
          status: success ? :ok : :not_found,
          message: success ? "Tag found successfully" : "Tag not found",
          body: data
      )
    end
  end
  
