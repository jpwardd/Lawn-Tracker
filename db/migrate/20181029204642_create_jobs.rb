class CreateJobs < ActiveRecord::Migration[5.2]
  def change
    create_table :jobs do |t|
      t.belongs_to :customer
      t.datetime :job_date, null: false
      t.text :notes
      t.belongs_to :user, null: false
      t.belongs_to :employee

      t.timestamps null: false
    end
  end
end
