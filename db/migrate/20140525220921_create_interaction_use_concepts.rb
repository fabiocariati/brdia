class CreateInteractionUseConcepts < ActiveRecord::Migration
  def change
    create_table :interaction_use_concepts do |t|
      t.integer :x
      t.integer :y
      t.integer :width
      t.integer :height
      t.string :name
      t.string :concept_type
      t.references :concept_model
    end
    add_index :interaction_use_concepts, :concept_model_id
  end
end
