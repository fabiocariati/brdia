class CreateStartConcepts < ActiveRecord::Migration
  def change
    create_table :start_concepts do |t|
      t.string :concept_type
      t.string :name
      t.integer :x
      t.integer :y
      t.references :concept_model
    end
    add_index :start_concepts, :concept_model_id
  end
end
