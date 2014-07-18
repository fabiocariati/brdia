class AddPosToActorConcept < ActiveRecord::Migration
  def change
    add_column :actor_concepts, :x, :integer
    add_column :actor_concepts, :y, :integer
  end
end
