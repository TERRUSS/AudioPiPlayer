
var socket = io.connect('192.168.0.10');  //enable connection with the server


$("#pause").on('click', () => {
  socket.emit('pause');
})


$('#reload').on('click', () => {
	socket.emit('reload');
});

  //for testing purpose

  let a = new Track({path:"/path/to/song.mp3"});
  let b = new Track({path:"/path/to/song1.mp3"});
  let c = new Track({path:"/path/to/song2.mp3"});
  let d = new Track({path:"/path/to/song3.mp3"});
  let e = new Track({path:"/path/to/song4.mp3"});
