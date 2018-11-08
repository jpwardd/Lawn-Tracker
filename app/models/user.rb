class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  has_many :customers
  has_many :jobs
  
  validates :role, null: false
 

  def admin?
    role == "admin"
  end
end