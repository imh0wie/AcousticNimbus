class ChangesSongsColumnsToNull < ActiveRecord::Migration[5.2]
  def change
    change_column_null(:songs, :genre, true)
  end
end
