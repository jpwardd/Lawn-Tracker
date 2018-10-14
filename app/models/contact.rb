class Contact < ApplicationRecord
  validates :first_name, presence: true
  validates :phone_number, numericality: true
  validates :address, presence: true
  validates :email, presence: true
  
end

