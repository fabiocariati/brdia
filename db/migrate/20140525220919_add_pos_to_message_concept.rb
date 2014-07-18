class AddPosToMessageConcept < ActiveRecord::Migration
  def change
    add_column :message_concepts, :x, :integer
    add_column :message_concepts, :y, :integer
  end
end
