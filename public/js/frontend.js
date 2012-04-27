function liveTime(ele){
    $('#'+ele).html(getTime());
    setTimeout(function(){ liveTime(ele) }, 1000);
}

function getTime(){
    var d = new Date();
    var s = (d.getSeconds() < 10) ? "0"+d.getSeconds() : d.getSeconds();
    var m = (d.getMinutes() < 10) ? "0"+d.getMinutes() : d.getMinutes();
    return d.getHours()+":"+m+":"+s;
}

function addNews(news){
    $('.newsfeed').prepend(newsTemplate(news));
}


var newsTemplate = Handlebars.compile($('#newsItemTemplate').html());
var socket = io.connect('http://localhost');


socket.on('news', function(data){
   for ( x in data ){
        addNews(data[x]);
   }
});

socket.on('update news', function(data){
    console.log(data);
   var e = $('.news[rel='+data.id+']');
   e.find('.ticker span').text(data.ticker);
   e.find('.headline').text(data.title);
   if (data.username != $('#username').val()){
        e.find('.istyping').text(data.username+' is typing...');
        e.find('.istyping').removeClass('hide');
   }
});

socket.on('edit news',function(data){
   var e = $('.news[rel='+data+']');
   e.find('.ticker span').addClass('hide');
   e.find('input[name=ticker]').removeClass('hide').focus();
   e.find('.headline').addClass('hide');
   e.find('input[name=headline]').removeClass('hide');
});

socket.on('close news', function(data){
   var e = $('.news[rel='+data+']');
   e.find('.istyping').addClass('hide');
   e.removeClass('green');
});

$(function(){
   $('#enterUsername').modal();
   $('#addNewsBtn').click(function(){
        socket.emit('create news');
        $(this).addClass('hide');
        return false;
   });
   $('.ticker input, input[name=headline]').live('keyup', function(xx){
        if(xx.which != 13){           
            var e = $(this).parents('.news');
            var news = {'title': e.find('input[name=headline]').val(), 'ticker': e.find('input[name=ticker]').val(), 'id': e.attr('rel'), 'username': $('#username').val()};
            console.log(news);
            socket.emit('live news', news);
        }
   });
   $('input[name=headline]').live('keypress', function(e){
      var x = $(this).parents('.news');
      
      if(e.which == 13){
        socket.emit('save news', x.attr('rel'));
        x.find('.headline').removeClass('hide');
        x.find('input[name=headline]').addClass('hide');
        x.find('.ticker span').removeClass('hide');
        x.find('input[name=ticker]').addClass('hide');
        $('#addNewsBtn').show();
      }
   });
});

