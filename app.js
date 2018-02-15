	/* APP.JS */

	const express = require('express');
	const http = require('http');
	const fs = require('fs');

	const app = express();
	const server = http.createServer(app);
	const io = require('socket.io')(server);

	const { exec } = require('child_process');

	const { refreshList } = require('./tracks');

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

	global.tracks = [];

	io.sockets.on('connection', (socket) => {
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
	  socket.on("chSong", (path) => {

	    if (status.pause == false) {
				console.log("Track is playing. Killing it.");
	      exec('killall play', (error, stdout, stderr) => {
	        if (error) {
	          console.log('ERROR : ' + error);
	        }
	        return;
	      });
	    } else {
				console.log('No track playing.');
			}

			console.log("Playing " + path);
	    exec('play ' + '"' + path + '"', (error, stdout, stderr) => {
	      if (error) {
	        console.log("ERROR : " + error);

	        socket.broadcast.emit('error', ('play', stderr));
	        return;
	      }

	      status.playing = path;
	      status.pause = false;

	      console.log("STDERR : " + stderr);

	      sudosocket.broadcast.emit('chSong', path);
	      socket.emit('chSong', path);
	      socket.broadcast.emit('status', status);
	      socket.emit('status', status);
	    });
	  });

	  //pause
  socket.on('pause', () => {
    if (status.pause == false) {
      exec('killall play', (error, stdout, stderr) => {
        if (error) {
          console.log('ERROR : ' + error);
        }
      });

			status.pause = true;
			status.playing  == null;
    } else {
			//TODO: handle pause .. :/
		}

    socket.broadcast.emit('pause', status.pause);
    socket.emit('pause', status.pause);
	  });

	});

	server.listen(80);
