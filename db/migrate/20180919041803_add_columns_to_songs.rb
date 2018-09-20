class AddColumnsToSongs < ActiveRecord::Migration[5.2]
  def change
    add_column :songs, :audio_url, :string
    add_column :songs, :image_url, :string
  end
end
