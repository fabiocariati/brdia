class AddPosToClassConcept < ActiveRecord::Migration
  def change
    add_column :class_concepts, :x, :integer
    add_column :class_concepts, :y, :integer
  end
end
