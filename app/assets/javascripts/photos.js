var image, cropper, main_prev;


$(document).ready(function() {
  
  //Basic usage copied from website 
  image = document.getElementById('img_crop');
  cropper = new Cropper(image, {
    aspectRatio: 16 / 9,
    crop: function(e) {
      //console.log('X: ' + e.detail.x + ' Y: ' + e.detail.y + ' Width: ' + e.detail.width + ' Height: ' + e.detail.height + ' ScaleX: ' + e.detail.scaleX + ' ScaleY: ' + e.detail.scaleY );
      //console.log(e);
      $('#photo_crop_x').val(e.detail.x);
      $('#photo_crop_y').val(e.detail.y);
      $('#photo_crop_h').val(e.detail.height);
      $('#photo_crop_w').val(e.detail.width);
      
      updatePreview(e);
      
      
      
      
      
      
    },
    zoomable: false
  });

});

function updatePreview(e) {
  main_prev = $('#main_preview img');
  var ratio = 16/9;
  
  main_prev.width(300);
  //main_prev.height(e.detail.width/ratio);
  main_prev.css('top', -(e.detail.y/9));
  main_prev.css('left', -(e.detail.x/16));
}