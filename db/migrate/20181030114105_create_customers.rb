class CreateCustomers < ActiveRecord::Migration[5.2]
  def change
    create_table :customers do |t|
      t.string :first_name, null: false
      t.string :last_name, null: false
      t.string :phone_number, null: false
      t.string :email
      t.string :address
      t.string :city
      t.string :state
      t.string :zip_code
      t.belongs_to :jobs
      
      t.timestamps null: false
    end
  end
end
