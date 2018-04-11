/* DB.JS */


const { execSync } = require('child_process');
const { parseFile } = require('music-metadata');

const mysql = require('mysql');

const currentFolder = '/home/terruss/Code/NODE/PiPlayer--Ultimate/'

function refreshDB() {


  execSync(currentFolder+'reload.sh', (error, stdout, stderr) => {
    if (error) {
      throw error;
      console.log('./refresh ERROR : ' + error);
      return;
    }

    console.log('STDOUT :' + stdout);
    console.log('STDERR :' + stderr);
    console.log("db refreshed");
  });
}

exports.refreshList = function(callback) {
  console.log('refreshing DB');
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
  connection.query('SELECT * FROM tracks', (error, results, fields) => {
    if (error) {
      throw error;
      //	socket.broadcast.emit('error', {location:'select', err:error});
    } else {
      let length = results.length;
      for (let i = 0; i < length; i++) {
        tracks.push({});
        tracks[i].path = results[i].path;
        console.log("parsed :");
        parseFile(results[i].path, { native: false})
          .then(function (metadata) {
            tracks[i].title = metadata.common.title;
            console.log(tracks[i].title);
            tracks[i].artist = metadata.common.artist;
            tracks[i].album = metadata.common.album;
          })
          .catch(function(err){
            console.log(err.message);
          })
      }

      connection.end();
      callback();
    }
  });
}
