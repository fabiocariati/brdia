class AddBaseToLifeline < ActiveRecord::Migration
  def change
    add_column :lifeline_concepts, :base, :integer
  end
end
