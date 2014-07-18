class CreateMethodConcepts < ActiveRecord::Migration
  def change
    create_table :method_concepts do |t|
      t.string :name
      t.integer :position
      t.references :class_concept

      t.timestamps
    end
    add_index :method_concepts, :class_concept_id
  end
end
