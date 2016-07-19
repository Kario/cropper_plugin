var image, cropper;


$(document).ready(function() {
  
  //Basic usage copied from website 
  image = document.getElementById('img_crop');
  cropper = new Cropper(image, {
    aspectRatio: 16 / 9,
    crop: function(e) {
      console.log('X: ' + e.detail.x + ' Y: ' + e.detail.y + ' Width: ' + e.detail.width + ' Height: ' + e.detail.height + ' ScaleX: ' + e.detail.scaleX + ' ScaleY: ' + e.detail.scaleY );
      console.log(e);
    },
    zoomable: false
  });

});