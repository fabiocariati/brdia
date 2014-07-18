class CreateConceptModels < ActiveRecord::Migration
  def change
    create_table :concept_models do |t|
      t.string :type
      t.string :name
      t.references :specification

      t.timestamps
    end
  end
end
