class AddPresenseConstraintToSongAudioUrl < ActiveRecord::Migration[5.2]
  def change
    change_column_null :songs, :audio_url, :string, false
  end
end
