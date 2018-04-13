$(document).ready(function(){

  function init(){

    var flicker_speed = 100;
    var autoplay_speed = 2000;
    var trigger_distance = 275;

    var $el = $('.graphic img');
    var all_colors = 'green orange purple cyan yellow';
    var colors = ['green', 'orange', 'purple', 'cyan', 'yellow'];
    var color_index = 0;

    function flicker(color, index){
      var i = index+1;
      $('.bottom').removeClass(all_colors);
      $('.top').removeClass('left right');
      $('.bottom').removeClass('left right');
      $('.bottom').addClass(color);
      if(i===1){
        $('.top').addClass('right');
        $('.bottom').addClass('left');
      }
      if(i===2){
        $('.top').addClass('left');
        $('.bottom').addClass('right');
      }
      if(i===3){
        $('.top').addClass('left');
        $('.bottom').addClass('right');
      }
      if(i<4){
        $el.attr('src', 'img/'+color+'/'+color+i+'.jpg');
        setTimeout(function(){
          flicker(color, i);
        }, (flicker_speed + ((flicker_speed*0.5) * Math.random())) );
        // }, flicker_speed);
      } else {
        i = 0;
        $el.attr('src', 'img/'+color+'/'+color+i+'.jpg');
      }
    }


    function trigger_switch(){
      clearTimeout(window.timeout_interval);
      flicker(colors[(color_index%colors.length)], 0);
      color_index=color_index+1;
      window.timeout_interval = setTimeout(trigger_switch, autoplay_speed);
    }

    window.timeout_interval = setTimeout(trigger_switch, autoplay_speed);

    var totalDistance = 0;
    var lastSeenAt = {x: null, y: null};

    $(window).mousemove(function(event) {
      if(lastSeenAt.x) {
        totalDistance += Math.sqrt(Math.pow(lastSeenAt.y - event.clientY, 2) + Math.pow(lastSeenAt.x - event.clientX, 2));
        $('span').text('So far your mouse ran this many pixels:   ' + Math.round(totalDistance));

        if(totalDistance > trigger_distance){
          trigger_switch();
          totalDistance = 0;
        }
      }
      lastSeenAt.x = event.clientX;
      lastSeenAt.y = event.clientY;
    });

    var graphic = {width: null, height: null};
    graphic.width = $('.graphic img').innerWidth();
    graphic.height = $('.graphic img').innerHeight();
    graphic.ratio = graphic.width / graphic.height;

    var text = {width: null, height: null};
    text.width = $('.text').innerWidth();
    text.height = $('.text').innerHeight();
    text.ratio = text.width / text.height;

    function calculate_mobile(){
      if($('.desktop').length){
        graphic.width = $('.graphic img').innerWidth();
        graphic.height = $('.graphic img').innerHeight();
        graphic.ratio = graphic.width / graphic.height;
        text.width = $('.text').innerWidth();
        text.height = $('.text').innerHeight();
        text.ratio = text.width / text.height;
      }

      var graphic_width = window.innerHeight * graphic.ratio;
      var text_width = ((text.height / window.innerHeight) * window.innerHeight) * text.ratio;

      if((graphic_width + text_width) > window.innerWidth){
        $('body').removeClass('desktop');
        $('body').addClass('mobile');
      } else {
        $('body').removeClass('mobile');
        $('body').addClass('desktop');
      }
    }
    $(window).resize(calculate_mobile);
    calculate_mobile();

    // lazy load images
    for(var color_i = 0; color_i<colors.length; color_i++){
      for(var index_i =0; index_i < 4; index_i ++){
        var foobar = new Image();
        foobar.src = 'img/'+colors[color_i]+'/'+colors[color_i]+index_i+'.jpg';
      }
    }

    var disco_index = 0, disco_interval = null;
    $('.text .top').hover(function(){

      var $el = $(this);
      disco_interval = setInterval(function(){
        $el.removeClass(all_colors);
        $el.addClass(colors[disco_index%colors.length]);
        disco_index++;
      }, (flicker_speed + ((flicker_speed*0.5) * Math.random())) );
    }, function(){
      clearInterval(disco_interval);
      $(this).removeClass(all_colors);

    });
  }

  init();

});
