

var socket = io.connect('localhost');  //enable connection with the server


$("#pause").on('click', () => {
  socket.emit('pause');
})


$('#reload').on('click', () => {
	socket.emit('reload');
});
