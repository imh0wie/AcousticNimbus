class AddColumnsToUsers < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :profile_pic_url, :string
    add_column :users, :cover_photo_url, :string
  end
end
