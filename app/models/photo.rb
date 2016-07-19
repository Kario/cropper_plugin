class Photo < ActiveRecord::Base
  attr_accessible :image_content_size, :image_content_type, :image_file_name, :image_updated_at, :name, :image
  
  has_attached_file :image,
	:styles => { :medium => '600x400>', :small => '180x180#', :search_results => '136x136#', :large => 'x572', :thumbnail => '50x50#' },
    :processors => [:cropper],
	:default_style => :medium
	
  validates_attachment_content_type :image, :content_type => /^image\/(jpg|jpeg|pjpeg|png|x-png|gif)$/, :message => 'file type is not allowed (only jpeg/png/gif images)'

  after_update :reprocess_avatar, :if => :cropping?
  
  attr_accessor :crop_x, :crop_y, :crop_w, :crop_h, :crop_style
  
  def cropping?
    !crop_x.blank? && !crop_y.blank? && !crop_w.blank? && !crop_h.blank? && !crop_style.blank?
  end
  
  private
  
  def reprocess_avatar
    avatar.reprocess! crop_style.parameterize.underscore.to_sym
  end
end
