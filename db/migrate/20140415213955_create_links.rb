class CreateLinks < ActiveRecord::Migration
  def change
    create_table :links do |t|
      t.string :link_type
      t.integer :source
      t.integer :target
      t.references :concept_model
    end
    add_index :links, :concept_model_id
  end
end
