class CreateAttributeConcepts < ActiveRecord::Migration
  def change
    create_table :attribute_concepts do |t|
      t.string :name
      t.integer :position
      t.references :class_concept

      t.timestamps
    end
    add_index :attribute_concepts, :class_concept_id
  end
end
