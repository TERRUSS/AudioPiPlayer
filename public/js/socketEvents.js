
socket.on('status', (status) => {

  if (status.pause) {
    $("#pause").html('>>');
  } else {
    $("#pause").html('||');
  }

  if (status.playing) {
    $("#current #song").html(pathParse(status.playing)); // DONE:0 parse path to track.name
  }
})

socket.on('error', (stderr) => {
  console.log("SERVER ERROR : " + stderr);
});

socket.on('pause', (pause) => {
  if (pause) {
    $("#pause").html('>>');
  } else {
    $("#pause").html('||');
  }

  console.log('pause' + pause);
});


/*
list :
  [{
    name: "foo",
    artist: "bar",
    album: "foobar",
  }, {...}..]
*/

socket.on("trackList", (list) => {

  $('#tracklist').empty();
  for (let track of list) {
    new Track(track);
  }
});
