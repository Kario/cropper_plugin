class Photo < ActiveRecord::Base
  attr_accessible :image_content_size, :image_content_type, :image_file_name, :image_updated_at, :name, :image
  
  has_attached_file :image,
	:styles => { :medium => '600x400>', :small => '180x180#', :search_results => '136x136#', :large => 'x572', :thumbnail => '50x50#' },
	:default_style => :medium
	
  validates_attachment_content_type :image, :content_type => /^image\/(jpg|jpeg|pjpeg|png|x-png|gif)$/, :message => 'file type is not allowed (only jpeg/png/gif images)'
	
  
end
