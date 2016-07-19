var image, cropper, main_prev, main_prev_box, screen_img;


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
  main_prev_box_width = $('#main_preview_con').width();
  main_prev_box_height = $('#main_preview_con').height();
  screen_img = $('.cropper-canvas img');
  var orig_img = new Image();
  orig_img.src = screen_img.attr("src");
  
  var canv_orig_width = orig_img.width;
  var canv_orig_height = orig_img.height;
  
  var crop_orig_width = e.detail.width;
  var crop_orig_height = e.detail.height;
  
  
  
  //console.log(e);
  
  //Get the proportional difference between the crop height and the original height
  var xDelta = canv_orig_width / crop_orig_width;
  var yDelta = canv_orig_height / crop_orig_height;
  
  //console.log( canv_orig_width / crop_orig_width );
  
  //var percDec = 1 + ((canv_orig_width - crop_orig_width) / canv_orig_width);
  
  //Grab the difference betwene the boxes and assign the value to a new var
  var newWidth = xDelta * main_prev_box_width;
  var leftPos = (e.detail.x /(canv_orig_width / newWidth));
  
  var newHeight = yDelta * main_prev_box_height;
  var topPos = (e.detail.y /(canv_orig_height / newHeight));
  
  
  //console.log("ID STRING: " + (e.detail.x /(canv_orig_width / newWidth)) );
  
  
  //console.log("some kind of id string: " + xDelta * main_prev_box);
  
  //console.log(1 - (main_prev_box / crop_orig_width));
  
  //console.log($('#main_preview').width());
  //console.log(percDec);
  //console.log(crop_orig_width * ( percDec));
  
  //Assign the vars as appropriate
  main_prev.width( newWidth );
  //main_prev.height( newHeight );
  main_prev.css('top', -topPos);
  main_prev.css('left', -leftPos);
}