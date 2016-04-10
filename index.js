var app = require('http').createServer(handler);
var io = require('socket.io')(app);
var fs = require('fs');
var argv = require('minimist')(process.argv.slice(2));

function handler(req, res){
    fs.readFile(__dirname + '/index.html', function (err, data) {
        if (err) {
            res.writeHead(500);
            return res.end('Error loading index.html');
        }
        res.writeHead(200);
        res.end(data);
    });
}

io.on('connection', function(socket) {
    // console.log('a user connected');
    socket.on('disconnect', function() {
        // console.log('a user disconnected');
    });
    socket.on('echo', function(msg) {
        io.emit('echo', msg);
    })
});

var port = argv.p ? argv.p : '3000';

app.listen(+port, '0.0.0.0');
console.log('Server running at http://127.0.0.1:'+port);
