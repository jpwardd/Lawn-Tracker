class EmployeeSerializer < ActiveModel::Serializer
  attributes :id, :first_name, :last_name, :email, :user_id

  has_many :jobs
end
