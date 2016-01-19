class CreatePhotos < ActiveRecord::Migration
  def change
    create_table :photos do |t|
      t.string :image_content_type
      t.integer :image_file_size
      t.string :image_file_name
      t.string :image_updated_at
      t.string :name

      t.timestamps
    end
  end
end
