class Photo < ActiveRecord::Base
  attr_accessible :image_content_size, :image_content_type, :image_file_name, :image_updated_at, :name, :image, :crop_x, :crop_y, :crop_w, :crop_h, :crop_style 
  
  has_attached_file :image,
	:styles => { :medium => '600x400>', :small => '180x180#', :search_results => '136x136#', :large => 'x572', :thumbnail => '50x50#', :cropped => '400x225' },
    :processors => [:cropper],
	:default_style => :medium
	
  validates_attachment_content_type :image, :content_type => /^image\/(jpg|jpeg|pjpeg|png|x-png|gif)$/, :message => 'file type is not allowed (only jpeg/png/gif images)'

  after_update :reprocess_image, :if => :cropping?
  
  attr_accessor :crop_x, :crop_y, :crop_w, :crop_h, :crop_style, :processing
  
  def cropping?
    !crop_x.blank? && !crop_y.blank? && !crop_w.blank? && !crop_h.blank? && !crop_style.blank?
  end
  
  private

  def reprocess_image
    # don't crop if the user isn't updating the photo
    #   ...or if the photo is already being processed
    return unless (cropping? && !processing)
    logger.debug "Processing cropped image"
    self.processing = true
    image.reprocess! crop_style.parameterize.underscore.to_sym
    self.processing = false
  end
end