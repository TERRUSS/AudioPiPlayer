var timer;

exports.start = function () {
  timer = setInterval(function() {
    status.timestamp++;
    console.log(status.timestamp);
  }, 1000);
}

exports.pause = function(){
  clearInterval(timer);
	status.pause = true;
}

exports.stop = function () {
  clearInterval(timer);
	status.pause = true;
  status.timestamp = 0;
}
