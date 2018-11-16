class CreateEmployees < ActiveRecord::Migration[5.2]
  def change
    create_table :employees do |t|
      t.string :first_name, null: false
      t.string :last_name, null: false
      t.string :email, null: false
      t.string :password, null: false
      t.belongs_to :user, null: false
      t.belongs_to :job
    end
  end
end
