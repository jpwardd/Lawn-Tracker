class JobSerializer < ActiveModel::Serializer
  attributes :id, :customer_id, :user_id, :job_date

  belongs_to :customer
end
