class Job < ApplicationRecord
  validates :job_date, presence: true
  validates :name, presence: true

  belongs_to :customer
  belongs_to :user
end