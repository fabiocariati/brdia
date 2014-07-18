class CreateActionConcepts < ActiveRecord::Migration
  def change
    create_table :action_concepts do |t|
      t.string :concept_type
      t.string :name
      t.integer :x
      t.integer :y
      t.string :subtype
      t.references :concept_model
    end
    add_index :action_concepts, :concept_model_id
  end
end
