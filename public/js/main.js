
var socket = io.connect('192.168.0.10');  //enable connection with the server


$("#pause").on('click', () => {
  socket.emit('pause');
})


$('#reload').on('click', () => {
	socket.emit('reload');
});

