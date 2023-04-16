require 'rails_helper'

RSpec.describe PostTag, type: :model do
  describe 'attributes' do
    it { should respond_to(:post_id) }
    it { should respond_to(:tag_id) }
  end

  describe 'associations' do
    it { should belong_to(:post) }
    it { should belong_to(:tag) }
  end
end
