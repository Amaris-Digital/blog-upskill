RSpec.describe ApplicationController, type: :controller do
  payload = { user_id: 1 }

  describe "controller has valid methods" do
    it { is_expected.to respond_to(:encode_data) }
    it { is_expected.to respond_to(:decode_data) }
  end

  it "should encode data into hashed JWT" do
    encoded_data = @controller.encode_data(payload)
    decoded_data = @controller.decode_data(encoded_data)

    expect(decoded_data[0]["user_id"]).to eq(payload[:user_id])

  end
end
