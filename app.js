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
server.listen(8000);

// Create a Socket.IO instance, passing it our server
var io = sio.listen(server);

var i = 1;

// "Routing" for Socket.IO
io.sockets.on('connection', function (socket) {
    
    // When a newsfeed is submitted
    socket.on('add news', function (data) {
        console.log(data);
        io.sockets.emit('news', {'title': 'something', 'ticker': 'ok', 'date': 'lol'});
    });                    
});

