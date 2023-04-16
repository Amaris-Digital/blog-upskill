require 'rails_helper'

RSpec.describe Post, type: :model do

  describe 'attributes' do
    it { should respond_to(:title) }
    it { should respond_to(:content) }
  end

  describe 'validations' do
    it { should validate_presence_of(:title) }
    it { should validate_presence_of(:content) }
    it { should validate_length_of(:title).is_at_least(5) }
    it { should validate_length_of(:content).is_at_least(100) }
  end

  describe 'associations' do
    it { should belong_to(:user) }
    it { should belong_to(:category) }
    it { should have_many(:post_tags).dependent(:destroy) }
    it { should have_many(:tags).through(:post_tags) }
    it { should have_many(:comments).dependent(:destroy) }
  end


end
