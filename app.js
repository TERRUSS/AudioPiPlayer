

const express = require('express');
const http = require('http');
const fs = require('fs');

const app = express();
const server = http.createServer(app);
const io = require('socket.io')(server);

const { exec } = require('child_process');
const tracks = require('./tracks');

const mysql = require('mysql');
const connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: '',
	database: 'audio_pi_player'
});


app.use(express.static(__dirname + '/public'));


  //routing
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});


var status = {
  playing: null,
  pause: true
}

  //and the interseting stuff begin...
io.sockets.on('connection', (socket) => {

  socket.emit('trackList', tracks.getList());

  //change song
  socket.on("chSong", (path) => {
    console.log("chSong : " + path);

     exec('play ' + path, (error, stdout, stderr) => {
       if (error) {
         console.log("ERROR : " + error);
    
       	 socket.broadcast.emit('error', ('play', stderr));
         return;
       }
    
      status.playing = path;
      status.pause = false;
      console.log("STDOUT : " + stdout);
      console.log("STDERR : " + stderr);
      socket.broadcast.emit('chSong', path);
      socket.emit('chSong', path);
    });

  //pause
  socket.on('pause', () => {
    socket.broadcast.emit('pause', status.pause);
    socket.emit('pause', status.pause);

    status.pause = status.pause ? false : true; //for newies

  });

});

server.listen(80);
