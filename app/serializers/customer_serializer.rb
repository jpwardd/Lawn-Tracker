class CustomerSerializer < ActiveModel::Serializer
  attributes :id, :first_name, :last_name, :phone_number, :email, :address, :city, :state, :zip_code, :notes, :user_id

  has_many :jobs

end
