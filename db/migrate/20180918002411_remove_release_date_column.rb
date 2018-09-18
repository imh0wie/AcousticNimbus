class RemoveReleaseDateColumn < ActiveRecord::Migration[5.2]
  def change
    remove_column :songs, :release_date, :date
  end
end
