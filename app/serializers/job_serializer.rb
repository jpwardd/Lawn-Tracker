class JobSerializer < ActiveModel::Serializer
  attributes :id, :name, :customer_id, :notes, :job_date, :user_id

  belongs_to :customer
end
