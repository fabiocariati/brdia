class AddRepositoryAndRepositoryUserToSpecification < ActiveRecord::Migration
  def change
    add_column :specifications, :repository, :string
    add_column :specifications, :repository_user, :string
  end
end
