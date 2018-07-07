$(document).ready(function(){
  function calculate(){
    var right_width = $('#viewport .right').innerWidth();
    var right_height = $('#viewport .right').innerHeight();
    var ratio = right_width/right_height;
    console.log(ratio);
    if(window.innerWidth < 600){
      $('body').removeClass('set-text-to-width');
      $('body').removeClass('set-text-to-height');
      return;
    }
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


  $('#viewport .left').hover(function(){
    $('body').addClass('inverted');
  }, function(){
    $('body').removeClass('inverted');
  });

  $('#viewport .logo-grid img').mousemove(function(e){
    $('.logo-preview img').attr('src', $(this).attr('src'));
    $('.logo-preview').css({
      opacity: 1,
      left: e.clientX,
      top: e.clientY,
    });

    console.log(e, e.clientX, e.screenY);  
  });
  $('#viewport .logo-grid img').mouseout(function(e){
    $('.logo-preview').css({opacity: 0});
  });
  // var paused = false;
  // function loop() {
  //   var rand = Math.round(Math.random() * (2000 - 1000)) + 1000;
  //   setTimeout(function() {
  //     if(!paused){
  //       $('body').toggleClass('inverted');
  //       loop();
  //     }
  //   }, rand);
  // }
  // loop();

  // $('#viewport .right .controls .pause').click(function(e){
  //   $('body').addClass('paused');
  //   paused = true;
  // });
  // $('#viewport .right .controls .play').click(function(e){
  //   $('body').removeClass('paused');
  //   loop();
  //   paused = false;
  // });

  // $('#viewport .right .logo-grid img').hover(function(){
  //   // $()
  // }, function(){

  // });


});
