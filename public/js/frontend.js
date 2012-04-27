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



var socket = io.connect('http://localhost');



var NewsItem = Backbone.Model.extend({
   
   idAttribute: "_id",
   
   create: function() {
    
   },
   
   edit: function() {
    
   }
   
});

var NewsFeed = Backbone.Model.extend({
   model: NewsItem 
});




var editingId = 0;


socket.on('news', function(data){
   console.log(data); 
});

socket.on('updatenews',function(data){
   $('#id'); 
});

$(function(){
   $('#enterUsername').modal();
});

