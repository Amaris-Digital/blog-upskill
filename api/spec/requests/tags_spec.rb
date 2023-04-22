require 'rails_helper'

RSpec.describe TagsController, type: :controller do
  include TestHelpers

  it { should respond_to(:index) }
  it { should respond_to(:show) }

  let!(:user) do
    User.create(name: "test", email: "test@example.com", password: "test")
  end
  let!(:category) { Category.create(name: "Tosh on Steroids") }
  
  let!(:valid_post) do
    post = user.posts.create(
      title: "Tosh on Steroids",
      content:
      " is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      category: category,
    )
    post.tags.create(name: "TDD")
    post.tags.create(name: "BDD")
    post
  end
  
  describe ' tags controller request ', type: :request do
    before { @token_header = sign_in_user(user) }
    describe 'GET /tags' do
      context 'when logged in' do
        before { get '/tags', headers: @token_header }
        it 'should return an ok status code' do
          expect(response).to have_http_status(:ok)
        end

        it 'should return a message post ' do
          expect(JSON.parse(response.body)['message']).to eq(
            'Tags fetched successfully'
          )
        end
      end

      context 'when not logged in' do
        before { get '/tags' }
        it ' should return unauthorized status code when not logged in' do
          expect(response).to have_http_status(:unauthorized)
        end
      end
    end
    
    describe 'GET /tags/:id' do
      context 'when the tag exists' do
        before { get "/tags/#{valid_post.tags.first.id}", headers: @token_header }
        it 'should return an ok status code' do
          puts "here #{valid_post.tags}"
          expect(response).to have_http_status(:ok)
        end

        it 'should return the post associated with the tag' do
          expect(
            JSON.parse(response.body)['body']['tag']['posts']
          ).to_not be_empty
        end
      end

      context 'when the tag does not exist' do
        before { get '/tags/0', headers: @token_header }
        it 'should return a not found status code' do
          expect(response).to have_http_status(:not_found)
        end
      end
    end

  end


end
