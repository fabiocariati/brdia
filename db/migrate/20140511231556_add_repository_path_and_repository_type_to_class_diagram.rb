class AddRepositoryPathAndRepositoryTypeToClassDiagram < ActiveRecord::Migration
  def change
    add_column :concept_models, :repository_path, :string
    add_column :concept_models, :repository_type, :string
  end
end
