class UserSerializer < ActiveModel::Serializer
  attributes :id, :email, :employees
end
