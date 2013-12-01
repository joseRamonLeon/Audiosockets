var app = require('express')(),
    server = require('http').createServer(app),
    io = require('socket.io').listen(server);
io.set('log level', 1);

app.get('/send', function(request, response) {
    response.sendfile(__dirname + "/send.html");
});

app.get('/receive', function(request, response) {
    response.sendfile(__dirname + "/receive.html");
});

app.get('/receive.js', function(request, response) {
    response.sendfile(__dirname + "/receive.js");
})

app.get('/push.js', function(request, response) {
    response.sendfile(__dirname + "/push.js");
});

io.sockets.on('connection', function(socket) {
    socket.on('fileSend', function(data) {
        console.log("received audio info");
        io.sockets.emit('musicData', data);
    });
});

server.listen(8080);
