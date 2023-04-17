require "rails_helper"

RSpec.describe PostsController, type: :controller do
  include TestHelpers
  describe "it should have this methods" do
    it { should respond_to(:fetch_posts) }
    it { should respond_to(:create_post) }
    it { should respond_to(:update_post) }
    it { should respond_to(:destroy_post) }
    it { should respond_to(:show_post) }
  end

  describe "post controller requests", type: :request do
    
    
    it "create, show, update and delete post" do
      
    end
  end
end
