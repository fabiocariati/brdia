class CreateMessageConcepts < ActiveRecord::Migration
  def change
    create_table :message_concepts do |t|
      t.string :link_type
      t.integer :linePosition
      t.integer :source
      t.integer :target
      t.string :name
      t.references :concept_model
    end
    add_index :message_concepts, :concept_model_id
  end
end
