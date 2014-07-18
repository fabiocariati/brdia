class CreateClassConcepts < ActiveRecord::Migration
  def change
    create_table :class_concepts do |t|
      t.string :concept_type
      t.string :name
      t.string :stereotype
      t.references :concept_model

      t.timestamps
    end
    add_index :class_concepts, :concept_model_id
  end
end
