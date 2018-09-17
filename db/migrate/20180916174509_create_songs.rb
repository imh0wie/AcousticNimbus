class CreateSongs < ActiveRecord::Migration[5.2]
  def change
    create_table :songs do |t|
      t.string :title, null: false
      t.string :description
      t.string :genre, null: false
      t.date :release_date, null: false
      t.boolean :availability, null: false
      t.integer :artist_id, null: false
      t.integer :playlist_id, null: false

      t.timestamps
    end
    add_index :songs, :title
    add_index :songs, :artist_id
  end
end
