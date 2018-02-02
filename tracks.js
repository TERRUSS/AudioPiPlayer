
const mysql = require('mysql');
const connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: '',
	database: 'audio_pi_player'
});


 function refreshDB() {
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

exports.refreshList = function() {

	refresh();

		//SQL shit
	//push all paths in an array i guess
	var list = [];
	connection.connect();

	connection.query('SELECT paths FROM paths', function (error, results,  fields) => {
		if (error) throw error;
		
		let length = results.length;
		for (let i=0; i<length; i++){
			list[i] = results[i].solution;
		}
		return list;
	});

	return false;
}

/*
 * TODO: refresh func
 * TODO: init function witch exec refresh()  && stock it in a var in order to send it to all newies
 * TODO: the 'refresh' button on index.html
 * */
