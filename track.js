	/* TRACK.JS */

const { execSync } = require('child_process');
const { exec } = require('child_process');

const Timer = require('./timer');


exports.play = function(path, timestamp) {

	if (timestamp) { // if we're not in pause

		status.playing = path;
		status.pause = false;

		exec('play ' + '"' + path + '" trim ' + timestamp, (error, stdout, stderr) => {
			if (error) {
				console.log('ERROR : ' + error);
			}
			console.log('STDERR : ' + stderr);
		});

	} else {

		status.playing = path;
		status.pause = false;
		status.timestamp = 0;

		exec('play ' + '"' + path + '"', (error, stdout, stderr) => {
			if (error) {
				console.log('ERROR : ' + error);
			}
			console.log('STDERR : ' + stderr);
		});
	}
	
	Timer.start();
}


exports.stop = function () {
	exec('killall play', (error, stdout, stderr) => {
		if (error) {
			console.log('ERROR : ' + error);
		}
	});
	status.pause = true;
}
