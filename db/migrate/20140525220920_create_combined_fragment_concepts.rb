class CreateCombinedFragmentConcepts < ActiveRecord::Migration
  def change
    create_table :combined_fragment_concepts do |t|
      t.integer :x
      t.integer :y
      t.integer :width
      t.integer :height
      t.string :operator
      t.string :concept_type
      t.references :concept_model
    end
    add_index :combined_fragment_concepts, :concept_model_id
  end
end
