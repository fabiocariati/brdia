class CreateEventConcepts < ActiveRecord::Migration
  def change
    create_table :event_concepts do |t|
      t.string :name
      t.integer :position
      t.references :state_concept
    end
    add_index :event_concepts, :state_concept_id
  end
end
