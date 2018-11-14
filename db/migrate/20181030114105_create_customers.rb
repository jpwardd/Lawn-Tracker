class CreateCustomers < ActiveRecord::Migration[5.2]
  def change
    create_table :customers do |t|
      t.string :first_name, null: false
      t.string :last_name
      t.string :phone_number, null: false
      t.string :email
      t.string :address, null: false
      t.text :notes
      t.belongs_to :user, null: false
      t.string :lat, null: false
      t.string :lng, null: false
      
      t.timestamps null: false
    end
  end
end
