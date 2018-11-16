class Job < ApplicationRecord
  validates :job_date, presence: true

  belongs_to :customer
  belongs_to :user
  belongs_to :employee
end