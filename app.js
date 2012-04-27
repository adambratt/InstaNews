var http = require('http'),
    sio = require('socket.io'),
    fs = require('fs'),
    path = require('path');

// Start the server at port 8080
var server = http.createServer(function(request, response){ 

    var filePath = './public/' + request.url;
    if (filePath == './public//')
        filePath = './public/index.html';
     
    path.exists(filePath, function(exists) {
     
        if (exists) {
            fs.readFile(filePath, function(error, content) {
                if (error) {
                    response.writeHead(500);
                    response.end();
                    console.log("500 Error on file: ", filePath);
                }
                else {
                    response.writeHead(200, { 'Content-Type': 'text/html' });
                    response.end(content, 'utf-8');
                    console.log("Loading file: ", filePath);
                }
            });
        }
        else {
            response.writeHead(404);
            response.end();
            console.log("404 Error on file: ", filePath);
        }
    });
});
server.listen(80);

// Create a Socket.IO instance, passing it our server
var io = sio.listen(server);

var i = 5;
var news = {1: {id: 1, title: 'Prosperity Bancshares Reports Q1 EPS $0.77 vs $0.74 Est', ticker: 'PB', date: '8:35:34'}, 2: {id: 2, title: 'Ruth\'s Hospitality Group Reports Q1 EPS $0.15 vs $0.15 Est; Revenues $101M vs $101.52M Est', ticker: 'RUTH', date: '8:36:22'}, 3: {id: 3, title: 'JP Morgan Maintains Amazon at Overweight, Raises PT from $210 to $250', ticker: 'AMZN', date: '8:38:45'}, 4: {id: 4, title: 'Simon Property Group Reports Q1 FFO $1.82 vs $1.68 Est; Revenues $1.12B vs $1.05B Est', ticker: 'SPG', date: '8:39:30'}};

// "Routing" for Socket.IO
io.sockets.on('connection', function (socket) {
    
    //Initialize data
    socket.emit('news', news);
    
    // When a newsfeed is submitted
    socket.on('add news', function (data) {
        console.log(data);
        io.sockets.emit('new', {'title': 'something', 'ticker': 'ok', 'date': 'lol'});
    });
    
    // When new news is created
    socket.on('create news', function (data) {
        send = {};
        i += 1;
        news[i] = {title: '', ticker: '', date: getTime(), id: i};
        send[i] = {title: '', ticker: '', date: getTime(), id: i};        
        io.sockets.emit('news', send);
        socket.emit('edit news', i);
    });
    
    socket.on('live news', function(data){
       io.sockets.emit('update news', data); 
    });
    
    socket.on('save news', function(data){
       io.sockets.emit('close news', data); 
    });
    
});

function getTime(){
    var d = new Date();
    var s = (d.getSeconds() < 10) ? "0"+d.getSeconds() : d.getSeconds();
    var m = (d.getMinutes() < 10) ? "0"+d.getMinutes() : d.getMinutes();
    return d.getHours()+":"+m+":"+s;
}