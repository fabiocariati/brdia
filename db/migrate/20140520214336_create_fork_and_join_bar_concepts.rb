class CreateForkAndJoinBarConcepts < ActiveRecord::Migration
  def change
    create_table :fork_and_join_bar_concepts do |t|
      t.string :concept_type
      t.integer :x
      t.integer :y
      t.integer :angle
      t.references :concept_model
    end
    add_index :fork_and_join_bar_concepts, :concept_model_id
  end
end
