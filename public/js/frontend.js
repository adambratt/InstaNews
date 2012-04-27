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

var NewsItem = function(title, date, ticker){
    var self = this;
    
    // Data
    self.title = ko.observable(title);
    self.date = date;
    self.ticker = ko.observable(ticker);
    self.editing = ko.observable(false);
    
    // Behaviors
    this.edit = function() { this.editing(true) }
}

var FeedViewModel = function() {
    var self = this;
    
    // Data
    self.newsToAdd = ko.observable(new NewsItem("","",""));
    self.tickerToAdd = ko.observable();
    self.titleToAdd = ko.observable();
    self.username = ko.observable();
    self.news = ko.observableArray([
        new NewsItem("Bob Jones Uni", "Today", "AAPL"),
        new NewsItem("This is an itemz", "Today", "AAPL")
    ]);
    
    // Behaviours
    self.createNews = function(news) {
      $('.addnews').show();
      self.newsToAdd = ko.observable(new NewsItem("", getTime(), ""));
      $('.addnews input').val('');
      self.news.unshift(self.newsToAdd);
    };
    
    self.addNews = function() {
        socket.emit('add news', {'title': self.titleToAdd(), 'date': getTime(), 'ticker': self.tickerToAdd()});
        $('.addnews').hide();
    }
    
    
}

var editingId = 0;

ko.applyBindings(new FeedViewModel());

socket.on('news', function(data){
   console.log(data); 
});

socket.on('updatenews',function(data){
   $('#id'); 
});

$(function(){
   $('#enterUsername').modal();
});

