class CreateJobs < ActiveRecord::Migration[5.2]
  def change
    create_table :jobs do |t|
      t.string :name, null: false
      t.belongs_to :customer
      t.text :notes
      t.datetime :job_date, null: false
      t.belongs_to :user, null: false

      t.timestamps null: false
    end
  end
end
