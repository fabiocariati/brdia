class CreateLifelineConcepts < ActiveRecord::Migration
  def change
    create_table :lifeline_concepts do |t|
      t.string :concept_type
      t.integer :x
      t.integer :y
      t.string :subtype
      t.string :name
      t.references :concept_model
    end
    add_index :lifeline_concepts, :concept_model_id
  end
end
