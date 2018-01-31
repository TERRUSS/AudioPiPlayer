
socket.on('init', (status) => {
  if(status.pause){
    $("#pause").html('>>');
  } else {
    $("#pause").html('||');
  }

  if(status.playing){
    $("#current #song").html(pathParse(status.playing));   // TODO: parse path to track.name
  }
})

socket.on("trackList", (list) => {
  for (let track of list) {
    new Track(track);
  }
});

socket.on('error', (stderr) => {
  console.log("SERVER ERROR : " + stderr);
});


socket.on("chSong", (track) => {
  $("#current #song").html(pathParse(track));    // TODO: parse path to track.name
});

socket.on('pause', (pause) => {
  if (pause) {
    $("#pause").html('>>');
  } else {
    $("#pause").html('||');
  }
});
