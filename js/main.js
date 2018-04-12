$(document).ready(function(){

  function effect1(){
    var delta = 200;
    var $el = $('.graphic img');
    var all_colors = 'green orange purple cyan yellow';
    var colors = ['green', 'orange', 'purple', 'cyan', 'yellow', 'orange', 'cyan'];
    var color_index = 0;

    function tick(index){
      var color = colors[color_index%colors.length];
      $el.attr('src', 'img/'+color+'/'+color+(index%4)+'.jpg');
      index++;
      $('.top').removeClass('left right');
      $('.bottom').removeClass('left right');
      if(index%4 === 0){
        color_index=color_index+1;
      }
      if(index%4 === 1){
        $('.top').addClass('left');
        $('.bottom').addClass('right');
      }
      if(index%4 === 2){
        $('.top').addClass('right');
        $('.bottom').addClass('left');
      }
      $('.bottom').removeClass(all_colors);
      $('.bottom').addClass(color);
      setTimeout(function(){
        tick(index);
      }, (delta + (delta * Math.random())));
    }
    tick(0);
  }







  function effect2(){

    var speed = 100;
    var $el = $('.graphic img');
    var all_colors = 'green orange purple cyan yellow';
    var colors = ['green', 'orange', 'purple', 'cyan', 'yellow', 'orange', 'cyan'];
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
      if(i<4){
        $el.attr('src', 'img/'+color+'/'+color+i+'.jpg');
        setTimeout(function(){
          flicker(color, i);
        }, (speed + (speed * Math.random())) );
      } else {
        i = 0;
        $el.attr('src', 'img/'+color+'/'+color+i+'.jpg');
      }
    }

    setInterval(function(){
      flicker(colors[(color_index%colors.length)], 0);
      color_index=color_index+1;
    }, 1500);
  }

  function effect3(){
    var speed = 80;
    var $el = $('.graphic img');
    var all_colors = 'green orange purple cyan yellow';
    var colors = ['green', 'orange', 'purple', 'cyan', 'yellow', 'orange', 'cyan'];
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
        }, (speed + (speed * Math.random())) );
      } else {
        i = 0;
        $el.attr('src', 'img/'+color+'/'+color+i+'.jpg');
      }
    }


    function trigger_switch(){
      clearTimeout(window.timeout_interval);
      flicker(colors[(color_index%colors.length)], 0);
      color_index=color_index+1;
      window.timeout_interval = setTimeout(trigger_switch, 1500);
    }

    window.timeout_interval = setTimeout(trigger_switch, 1500);


    var totalDistance = 0;
    var lastSeenAt = {x: null, y: null};

    $(window).mousemove(function(event) {
      if(lastSeenAt.x) {
        totalDistance += Math.sqrt(Math.pow(lastSeenAt.y - event.clientY, 2) + Math.pow(lastSeenAt.x - event.clientX, 2));
        $('span').text('So far your mouse ran this many pixels:   ' + Math.round(totalDistance));

        if(totalDistance > 250){
          trigger_switch();
          totalDistance = 0;
        }
      }
      lastSeenAt.x = event.clientX;
      lastSeenAt.y = event.clientY;
    });
  }

  function clear_animation(){
    $(window).off('mousemove');
    clearTimeout(window.timeout_interval);
  }
  $('#option0').click(function(){
    clear_animation();
    effect3();
  });
  $('#option1').click(function(){
    clear_animation();
    effect4();
  });

  function effect4(){
    var speed = 100;
    var $el = $('.graphic img');
    var all_colors = 'green orange purple cyan yellow';
    var colors = ['green', 'orange', 'purple', 'cyan', 'yellow', 'orange', 'cyan'];
    // var color_index = 0;

    var color_index = 0, index = 0;
    window.timeout_interval = setTimeout(tick, 1000);

    function tick(){
      clearTimeout(window.timeout_interval);
      index=index+1;
      var color = colors[color_index%colors.length];

      if(index%4 === 0){
        index=0;
        color_index=color_index+1;
      }

      $('.top, .bottom').removeClass('left right');
      if(index%4 === 1){
        $('.top').addClass('right');
        $('.bottom').addClass('left');
      }
      if(index%4 === 2){
        $('.top').addClass('left');
        $('.bottom').addClass('right');
      }
      if(index%4 === 3){
        $('.top').addClass('right');
        $('.bottom').addClass('left');
      }

      $('.bottom').removeClass(all_colors);
      $('.bottom').addClass(color);

      $el.attr('src', 'img/'+color+'/'+color+index+'.jpg');

      window.timeout_interval = setTimeout(tick, 1000);
    }

    var totalDistance = 0;
    var lastSeenAt = {x: null, y: null};

    $(window).mousemove(function(event) {
      if(lastSeenAt.x) {
        totalDistance += Math.sqrt(Math.pow(lastSeenAt.y - event.clientY, 2) + Math.pow(lastSeenAt.x - event.clientX, 2));
        $('span').text('So far your mouse ran this many pixels:   ' + Math.round(totalDistance));

        if(totalDistance > 125){
          tick();
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

    $(window).resize(function(){

      var graphic_width = window.innerHeight * graphic.ratio;
      var text_width =
      console.log(graphic_width);
      // console.log(graphic, text, window.innerWidth, window.innerHeight);
      // console.log($('.graphic img').innerHeight(), , window.innerWidth, window.innerHeight);
      // console.log($('.text').innerHeight()/window.innerHeight);
    });
  }

  // effect1();
  // effect2();
  effect3();
  // effect4();

});
