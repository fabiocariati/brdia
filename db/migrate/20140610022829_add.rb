class Add < ActiveRecord::Migration
  def change
    add_column :lifeline_concepts, :stopline, :boolean
  end
end
