class CreateLikes < ActiveRecord::Migration[5.2]
  def change
    create_table :likes do |t|
      t.integer :liker_id, null: false
      t.integer :likeable_id, null: false
      t.string :likeable_type, null: false
    end
    add_index :likes, :liker_id
    add_index :likes, :likeable_id
    add_index :likes, :likeable_type
    # ensuring each user can only like one thing once
  end
end
