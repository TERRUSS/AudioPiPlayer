
class Track{
  constructor(data){
    this.name = pathParse(data.path);
    this.path = data.path;

    let track = $("<p>").addClass('clickable').appendTo("#tracks").html(this.name);
    track.on("click", () => { //OMFG check that binded callbck tho
      socket.emit("chSong", this.path);
    });
  }
}


function pathParse(path){
  let name = path.match(/[\w-]+\./) + "";
  name = name.replace(/\.$/, '');
  // name = name.pop(); //So dirty, I know..
  return name;
}
