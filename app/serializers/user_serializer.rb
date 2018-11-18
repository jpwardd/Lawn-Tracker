class UserSerializer < ActiveModel::Serializer
  attributes :id, :email, :employees

  has_many :employees
end
