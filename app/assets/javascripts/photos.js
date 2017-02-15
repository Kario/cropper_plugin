var image, cropper, main_prev, main_prev_box, screen_img;


$(document).ready(function() {
  
  //Basic usage copied from website 
  image = document.getElementById('img_crop');
  cropper = new Cropper(image, {
      aspectRatio: 1920 / 1080,
    crop: function(e) {
      //console.log('X: ' + e.detail.x + ' Y: ' + e.detail.y + ' Width: ' + e.detail.width + ' Height: ' + e.detail.height + ' ScaleX: ' + e.detail.scaleX + ' ScaleY: ' + e.detail.scaleY );
      //console.log(e);
      $('#photo_crop_x').val(e.detail.x);
      $('#photo_crop_y').val(e.detail.y);
      $('#photo_crop_h').val(e.detail.height);
      $('#photo_crop_w').val(e.detail.width);
      
      updatePreview(e);
      
      
      
      
      
      
    },
    zoomable: false,
    preview: "#cropper_preview"
  });
  
  $('#photo_crop_style').change(function(e){
    var aString = e.target.value;
    aString = styleHash[aString];
    //aspectRatio = aspectString.split('x').filter(function(e) { return e.replace(/\D*|#*|>*|<*/g,'')} );
    var aRatio = aString.replace(/[#|>|<]*/g, '').split('x');
    cropper.setAspectRatio( parseInt(aRatio[0]) / parseInt(aRatio[1]) );
    
    console.log(e);
    console.log(aRatio);
  
  })
});

function updatePreview(e) {
  //update the globals
  main_prev = $('#main_preview img');
  main_prev_box_width = $('#main_preview_con').width();
  main_prev_box_height = $('#main_preview_con').height();
  
  //Get the original image without DOM scaling
  screen_img = $('.cropper-canvas img');
  var orig_img = new Image();
  orig_img.src = screen_img.attr("src");
  
  //Assign to instanced vars
  var canv_orig_width = orig_img.width;
  var canv_orig_height = orig_img.height;
  var crop_orig_width = e.detail.width;
  var crop_orig_height = e.detail.height;
  
  //Get the proportional difference between the crop height and the original height
  var xDelta = canv_orig_width / crop_orig_width;
  var yDelta = canv_orig_height / crop_orig_height;
  
  //Grab the difference betwene the boxes and assign the value to a new var
  var newWidth = xDelta * main_prev_box_width;
  var leftPos = (e.detail.x /(canv_orig_width / newWidth));
  
  var newHeight = yDelta * main_prev_box_height;
  var topPos = (e.detail.y /(canv_orig_height / newHeight));
  
  //Assign the vars as appropriate
  main_prev.width( newWidth );
  main_prev.height( newHeight );
  main_prev.css('top', -topPos);
  main_prev.css('left', -leftPos);
}