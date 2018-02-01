
 function refresh() {
	exec('./refresh.sh', (error, stdout, stderr) => {
		if (error) {
			console.log('./refresh ERROR : ' + error);
			socket.broadcast.emit('error', ('./refresh.sh', stderr));
			return;
		}

		console.log('STDOUT :' + stdout);
		console.log('STDERR :' + stderr);
	});
}

exports.getLine = function() {
	refresh();

		//SQL shit
	//push all paths in an array i guess
	//lets tryhard dud

	return list;
}

/*
 * TODO: refresh func
 * TODO: init function witch exec refresh()  && stock it in a var in order to send it to all newies
 * TODO: the 'refresh' button on index.html
 * */
