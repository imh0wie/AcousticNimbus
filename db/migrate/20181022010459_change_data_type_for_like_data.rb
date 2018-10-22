class ChangeDataTypeForLikeData < ActiveRecord::Migration[5.2]
  def change
    change_column :likes, :likeable_id, :int
  end
end
