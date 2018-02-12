
class Track{
  constructor(path){
	  console.log(path);
    this.name = pathParse(path);
    this.path = path;

    let track = $("<p>").addClass('clickable').appendTo("#tracks").html(this.path); 	//pathParse doesnt works, fu*k it for the moment
    track.on("click", () => { //OMFG check that binded callbck tho
      socket.emit("chSong", this.path);
    });
  }
}


function pathParse(path){
  let name = path.match(/[\w-]+\./) + "";
  name = name.replace(/\.$/, '');
  
	return name;
}
