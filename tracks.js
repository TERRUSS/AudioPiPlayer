	/* TRACKS.JS */


const { execSync } = require('child_process');

const mysql = require('mysql');
const connection = mysql.createConnection({
	host: '127.0.0.1',
	user: 'root',
	password: '',
	database: 'audio_pi_player'
});


function refreshDB() {
	execSync('/home/pi/Code/AudioPiPlayer/reload.sh', (error, stdout, stderr) => {
		if (error) {
			throw error;
			console.log('./refresh ERROR : ' + error);
			socket.broadcast.emit('error', {location:'./refresh.sh', err:stderr});
			return;
		}

		console.log('STDOUT :' + stdout);
		console.log('STDERR :' + stderr);
	});
}

exports.refreshList = function() {

	refreshDB();

		//SQL shit
	//push all paths in an array i guess
	var list = [];

	connection.connect();
	connection.query('SELECT paths FROM paths', (error, results,  fields) => {
		if (error){
			throw error;
		//	socket.broadcast.emit('error', {location:'select', err:error});
			return;
		} else {
			console.log("PATHS : ");
			let length = results.length;
			for (let i=0; i<length; i++){
				list[i] = results[i].paths;
				console.log(results[i].paths);
			}
			return list;
		}
	});
}

/*
 * TODO: the 'refresh' button on index.html
 * */
