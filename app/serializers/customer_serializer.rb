class CustomerSerializer < ActiveModel::Serializer
  attributes :id, :first_name, :last_name, :phone_number, :email, :address, :lng, :lat, :notes, :user_id

  has_many :jobs
  belongs_to :user
end
