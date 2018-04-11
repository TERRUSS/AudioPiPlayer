
var artists = {};
var albums = {};

class Track {
  constructor(track) {
    console.log(track);

    let path = track.path;
    let title = track.title || pathParse(path);

    let el = $("<p>").addClass('clickable').appendTo("#tracksList").html(title);
    el.on("click", () => { //OMFG check that binded callbck tho
      socket.emit("chSong", {path: path, title: title});
    });


      //ARTISTS
    let artist = track.artist || "unknown";
    let _artist = artist.replace(/\s/g, '_')

    if (!(_artist in artists)) { //if artist doesnt exists yet
      artists[_artist] = [];

      //display it
      let el = $("<p>").attr('id', _artist).addClass("clickable artist").html(artist).appendTo("#artistsList");
      $("<div>").addClass("shelf").appendTo(el);
      el.on('click', function (){
        $(".shelf").empty();

        for (let track of artists[_artist]) {
          let foo = $("<p>").addClass('clickable').appendTo("#"+_artist+".artist .shelf").html(track.title);
          foo.on("click", () => {
            socket.emit("chSong", {path: track.path, name: track.title});
          });
        }
      })
    }
    //now push the new track in the artists array
    artists[_artist].push({title: title, path: path});


      //ALBUMS
    let album = track.album || "unknown";
    let _album = album.replace(/\s/g, '_')

    if (!(_album in albums)) { //if album doesnt exists yet
      albums[_album] = [];

    //display it
      let el = $("<p>").attr('id', _album).addClass("clickable album").html(album).appendTo("#albumsList");
      $("<div>").addClass("shelf").appendTo(el);
      el.on('click', function (){
        $(".shelf").empty();

        for (let track of albums[_album]) {
          let foo = $("<p>").addClass('clickable').appendTo("#"+_album+".album .shelf").html(track.title);
          foo.on("click", () => {
            socket.emit("chSong", track);
          });
        }
      });
    }
    //now push the new track in the albums array
    albums[_album].push({title: title, path: path});
  }
}


function pathParse(path) {
  let name = path.replace(/\.(.*?)$/, '').replace(/(.*?)\/(?!.*\/)/, '');
  return name;
}
