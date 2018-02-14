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
 
  if (tracks != ''){
    socket.emit('trackList', tracks);
  } else {
   refreshList(function () {
    	socket.emit('trackList', tracks);
   })
  }

	
	//refresh the tracklist
  socket.on('reload', () => {
	console.log('reload');

	  tracks = refreshList("oi") 
	setTimeout(()=>{
	  socket.broadcast.emit('trackList', tracks);
	  socket.emit('trackList', tracks);
 	}, 1000);
  });


  //change song
  socket.on("chSong", (path) => {
	
	if ( status.playing ) {
		exec('killall play', (error, stdout, stderr) => {
			if (error) {
				console.log('ERROR : ' + error);
			}
			return;
		});
	}

     exec('play ' + '"' + path + '"', (error, stdout, stderr) => {
       if (error) {
         console.log("ERROR : " + error);
    
       	 socket.broadcast.emit('error', ('play', stderr));
	       return;
       }
    
      status.playing = path;
      status.pause = false;
      
	     console.log("STDOUT : " + stdout);
	      console.log("STDERR : " + stderr);

	    sudosocket.broadcast.emit('chSong', path);
      		socket.emit('chSong', path);
	socket.broadcast.emit('status', status);
	socket.emit('status', status);
    });
  });

  //pause
  socket.on('pause', () => {
	if ( status.playing ) {
		exec('killall play', (error, stdout, stderr) => {
			if (error) {
				console.log('ERROR : ' + error);
			}
		});
	}

    socket.broadcast.emit('pause', status.pause);
    socket.emit('pause', status.pause);

    status.pause = status.pause ? false : true; //for newies

  });

});

server.listen(80);
