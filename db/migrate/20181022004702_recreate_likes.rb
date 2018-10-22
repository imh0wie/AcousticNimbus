class RecreateLikes < ActiveRecord::Migration[5.2]
  def change
    create_table :likes do |t|
      t.references :likeable, polymorphic: true, index: true, null: false
      t.integer :liker_id, null: false
      t.timestamps
    end
  end
end
