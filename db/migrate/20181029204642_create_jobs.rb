class CreateJobs < ActiveRecord::Migration[5.2]
  def change
    create_table :jobs do |t|
      t.belongs_to :customer
      t.belongs_to :user
      t.date :job_date, null: false

      t.timestamps null: false
    end
  end
end
