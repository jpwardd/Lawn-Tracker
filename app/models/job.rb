class Job < ApplicationRecord
  validates :job_date, presence: true

  belongs_to :customer
end