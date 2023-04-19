class CategoriesController < ApplicationController
  before_action :authorized

  def index
    categories =
      Category.all.map { |category| SingleCategorySerializer.new(category) }
    if categories
      categories_fetched(data: { categories: categories })
    else
      categories_fetched(success: false)
    end
  end

  def show
    category = Category.find_by(id: params[:id])

    if category
      category_found(data: { category: CategorySerializer.new(category) })
    else
      category_found(success: false)
    end
  end

  private

  def categories_fetched success: true, data: nil
    app_response(
      status: success ? :ok : :unprocessable_entity,
      message: success ? "Categories fetched successfully" : "Categories fetch failed",
      body: data
    )
  end

  def category_found success: true, data: nil
    app_response(
        status: success ? :ok : :not_found,
        message: success ? "Category found successfully" : "Category not found",
        body: data
    )
  end
end
