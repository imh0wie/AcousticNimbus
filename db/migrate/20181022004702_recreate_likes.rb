class RecreateLikes < ActiveRecord::Migration[5.2]
  def change
    create_table :likes do |t|
      t.string :likeable_type, null: false
      t.integer :likeable_id, null: false
      t.integer :liker_id, null: false
    end

    add_index :likes, [:likeable_type, :likeable_id]
  end
end
