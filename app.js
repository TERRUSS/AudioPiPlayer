	/* APP.JS */

	const express = require('express');
	const http = require('http');
	const fs = require('fs');

	const app = express();
	const server = http.createServer(app);
	const io = require('socket.io')(server);

	const { refreshList } = require('./db');
	const Track = require('./track');
	const Timer = require('./timer');

	app.use(express.static(__dirname + '/public'));


	//routing
	app.get('/', (req, res) => {
	  res.sendFile(__dirname + '/index.html');
	});
	app.get('/mobile', (req, res) => {
	  res.sendFile(__dirname + '/mobile.html');
	});


	global.status = {
		pause: true,
	  playing: null,
		title: null,
		timestamp: null,
		duration: null
	}
	global.tracks = [];
	global.artists = [];
	global.albums = [];


	//and the interseting stuff begin...


	io.sockets.on('connection', (socket) => {
		console.log("websocket conection");
	  if (tracks != '') {
	    socket.emit('trackList', tracks);
	  } else {
	    refreshList(function() {
	      socket.emit('trackList', tracks);
      })
	  }
		socket.emit('status', status);

	  //refresh the tracklist
	  socket.on('reload', () => {
	    console.log('reload');

	    refreshList(function () {
				socket.emit('trackList', tracks);
				socket.broadcast.emit('trackList', tracks);
			})
	  });


	  //change song
	  socket.on("chSong", (track) => {

	    if (status.pause == false) {
				console.log("Track is playing. Killing it.");
	      Track.stop();
				Timer.stop();
	    } else {
				console.log('No track playing.');
			}

			console.log("Playing " + track.title);
			Track.play(track);
			socket.broadcast.emit('status', status);
			socket.emit('status', status);
	  });

	  //pause
  socket.on('pause', () => {
    if (status.pause == false) {
			console.log("track stoped at " + status.timestamp);
      Track.stop();
			Timer.pause();

			socket.broadcast.emit('status', status);
			socket.emit('status', status);

    } else {
			console.log("playing track");

			Track.play({path: status.playing, name: status.title}, status.timestamp)	//blocking function

			socket.broadcast.emit('status', status);
			socket.emit('status', status);
		}
	});

});

server.listen(80);
