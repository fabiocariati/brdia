class CreateStateConcepts < ActiveRecord::Migration
  def change
    create_table :state_concepts do |t|
      t.string :concept_type
      t.string :name
      t.integer :x
      t.integer :y
      t.references :concept_model
    end
    add_index :state_concepts, :concept_model_id
  end
end
