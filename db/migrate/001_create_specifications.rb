class CreateSpecifications < ActiveRecord::Migration
  def change
    create_table :specifications do |t|
      t.string :type
      t.string :name
      t.integer :project_id

      t.timestamps
    end
  end
end
