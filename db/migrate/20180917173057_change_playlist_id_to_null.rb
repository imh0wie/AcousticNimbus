class ChangePlaylistIdToNull < ActiveRecord::Migration[5.2]
  def change
    change_column_null(:songs, :playlist_id, true)
  end
end
