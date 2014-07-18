class CreateObjectNodeConcepts < ActiveRecord::Migration
  def change
    create_table :object_node_concepts do |t|
      t.string :concept_type
      t.string :name
      t.integer :x
      t.integer :y
      t.references :concept_model
    end
    add_index :object_node_concepts, :concept_model_id
  end
end
