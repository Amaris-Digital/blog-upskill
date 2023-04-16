require 'rails_helper'

RSpec.describe User, type: :model do
  describe 'Validations' do
    describe 'should have secure password' do
      it { should have_secure_password }
    end

    describe 'attributes' do
      it { should respond_to(:password_digest)}
      it { should respond_to(:authenticate) }
    end

    describe 'email and name validators' do
      it { should validate_presence_of(:name) }
      it { should validate_uniqueness_of(:name) }
      it { should validate_presence_of(:email) }
      it { should validate_uniqueness_of(:email) }
    end

    describe 'destroys associated posts and comments' do
      it { should have_many(:posts).dependent(:destroy) }
      it { should have_many(:comments).dependent(:destroy) }
    end


  end
end
