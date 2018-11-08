class Customer < ApplicationRecord
  validates :first_name, presence: true
  validates :last_name, presence: true
  validates :phone_number, presence: true
  
  has_many :jobs, dependent: :destroy
  belongs_to :user
end

