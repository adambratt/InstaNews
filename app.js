var io = require('socket.io').listen(80);

io.sockets.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(data);
  });
});

var http = require('http'),
    fs = require('fs'),
    index;

fs.readFile('./index.html', function (err, data) {
    if (err) {
        throw err; 
    }
    index = data;
});

http.createServer(function(request, response) {  
    response.writeHeader(200, {"Content-Type": "text/html"});  
    response.write(index);  
    response.close();  
}).listen(8000);