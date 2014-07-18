class CreateActorConcepts < ActiveRecord::Migration
  def change
    create_table :actor_concepts do |t|
      t.string :concept_type
      t.string :name
      t.references :concept_model
    end
    add_index :actor_concepts, :concept_model_id
  end
end
