class AddParentToStateConcept < ActiveRecord::Migration
  def change
    add_column :state_concepts, :parent, :string
  end
end
