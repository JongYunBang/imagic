importScripts('whammy.js');
//importScripts('../jquery2.1.1.js');

var video = new Whammy.Video(15);
onmessage = function(event){
  var receiveData = event.data;
  console.log(event);
  video.add(receiveData);
//  console.log(video);
//  console.log(document);
  if(receiveData == "done"){
	  postMessage(video.compile());
  }
}