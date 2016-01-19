class Photo < ActiveRecord::Base
  attr_accessible :image_content_size, :image_content_type, :image_file_name, :image_updated_at, :name
end
