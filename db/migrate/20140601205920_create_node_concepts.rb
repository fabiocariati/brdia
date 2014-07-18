class CreateNodeConcepts < ActiveRecord::Migration
  def change
    create_table :node_concepts do |t|
      t.integer :x
      t.integer :y
      t.string :name
      t.references :concept_model
    end
    add_index :node_concepts, :concept_model_id
  end
end
