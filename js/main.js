$(document).ready(function(){
  function calculate(){
    var right_width = $('#viewport .right').innerWidth();
    var right_height = $('#viewport .right').innerHeight();
    var ratio = right_width/right_height;
    console.log(ratio);
    if(ratio < 1){
      $('body').addClass('set-text-to-width');
      $('body').removeClass('set-text-to-height');
    } else {
      $('body').addClass('set-text-to-height');
      $('body').removeClass('set-text-to-width');
    }
  }
  calculate();
  $(window).resize(_.throttle(calculate,100));

  var hasInvert = false;
  setInterval(function(){
    $('body').toggleClass('inverted');
    if(hasInvert){
      hasInvert = false;
      $('body').removeClass('inverted');
      $('#viewport .right .logo-grid img').attr('src', 'img/logo-grid-right-black.png');
    } else {
      hasInvert = true;
      $('body').addClass('inverted');
      $('#viewport .right .logo-grid img').attr('src', 'img/logo-grid-right-white.png');
    }
  }, 800);
});
