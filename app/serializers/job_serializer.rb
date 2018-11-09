class JobSerializer < ActiveModel::Serializer
  attributes :id, :name, :customer_id, :notes, :presentable_job_date, :user_id, :day_of_week

  belongs_to :customer
  belongs_to :user   

  def presentable_job_date
    object.job_date.strftime("%A, %b %d")
  end

  def day_of_week
    object.job_date.strftime("%A")
  end
end
