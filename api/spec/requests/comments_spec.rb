require 'rails_helper'

RSpec.describe CommentsController, type: :controller do
  include TestHelpers

  it { should respond_to(:create_comment) }
  it { should respond_to(:edit_comment) }
  it { should respond_to(:destroy_comment) }

  let(:user) do
    User.create(name: "test", email: "test@example.com", password: "test")
  end

  let(:comment) do
    {
      body: "test comment"
    }
  end





  before { @token_header = sign_in_user(user) }


  describe "comment controller request", type: :request do
    
  end

  
end
