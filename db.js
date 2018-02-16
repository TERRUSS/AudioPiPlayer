/* DB.JS */


const { execSync } = require('child_process');

const mysql = require('mysql');


function refreshDB() {
  execSync('/home/pi/Code/AudioPiPlayer/reload.sh', (error, stdout, stderr) => {
    if (error) {
      throw error;
      console.log('./refresh ERROR : ' + error);
      return;
    }

    console.log('STDOUT :' + stdout);
    console.log('STDERR :' + stderr);
  });
}

exports.refreshList = function(callback) {

  refreshDB();

  //SQL shit
  //push all paths in the global var 'tracks'

  const connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'audio_pi_player'
  });

  connection.connect();
  connection.query('SELECT paths FROM paths', (error, results, fields) => {
    if (error) {
      throw error;
      //	socket.broadcast.emit('error', {location:'select', err:error});
    } else {
      let length = results.length;
      for (let i = 0; i < length; i++) {
        tracks[i] = results[i].paths;
      }
      connection.end();
      callback();
    }
  });
}
