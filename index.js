const express = require('express')
const app = express()
const port = 3000;
const dl = require('delivery');
const fs = require('fs');

app.set('views', __dirname + '/tpl');
app.set('view engine', "jade");
app.engine('jade', require('jade').__express);
app.use(express.static('public'))

app.get('/', function (req, res) {
//   res.send('Hello World!')
  res.render("page");
})

var io = require('socket.io').listen(app.listen(port));

// app.listen(3000, function () {
//   console.log('Example app listening on port 3000!')
// })

io.sockets.on('connection', function (socket) {
    socket.emit('message', { message: 'welcome to the chat' });
    socket.on('send', function (data) {
        io.sockets.emit('message', data);
        console.log("messgae emitted ",data)
    });
});