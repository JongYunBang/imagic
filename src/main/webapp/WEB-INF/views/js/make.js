$(document).ready(function(){
    var drag = document.getElementById("drag");
    var createvideo = document.getElementById("createvideo");
    var files = document.getElementById("filesinput");

    var ctx = 0;

    var canvas = document.getElementById("canvas");
    var context = canvas.getContext("2d");

    //image to video via Whammy
    var video = new Whammy.Video(15);

    var filesarr = [];
    
    // 넘어온 파일 리스트 저장용
    var fileList=[];
    
    $.ajax({
    	type : "POST",
    	url : "/makeFileList",
    	cache : false,
    	async : false,
    	data : {
    		m_id : $('#sessionID').val(),
			dirName : $('#sessionDirName').val(),
			dirNum : $('#sessionDirNum').val()
    	},
    	success : onSuccess,
		error : onError
    })
    function onSuccess(data) {
		
		fileList = data;
		for(var i=0; i<fileList.length; i++){
			filesarr[i]=fileList[i].imgBase64;
		}
		
	}
	function onError(data) {
		alert("파일 받아오기 실패");
	}

    createvideo.addEventListener("click", function() {

        document.getElementById('status').innerHTML = "Working... Please Wait.";

        document.getElementById('awesome').src = "";
        ctx = 0;

        canvas.width = document.getElementById("width").value;
        canvas.height = document.getElementById("height").value;
        video = new Whammy.Video(document.getElementById("framerate").value);

        //if we have images loaded
        if(filesarr.length>0){
//
            //loop through them and process
            for(i=0; i<filesarr.length; i++) {
                var file = filesarr[i];
                    process(file);
            }
//
        } else {
            document.getElementById('status').innerHTML = "Please select some images.";
        }

    }, false);

    drag.ondragover = function(e) {e.preventDefault()}
    drag.ondrop = function(e) {
        e.preventDefault();
        filesarr = e.dataTransfer.items;
        document.getElementById('status').innerHTML = "Please select options and click on Create Video.";
    }

    /* main process function */
    function process(file) {

    	var dataUri = file;
    	var img = new Image();

    	//load image and drop into canvas
    	img.onload = function() {

    	
    		context.clearRect(0,0,context.canvas.width,context.canvas.height);
    		context.globalAlpha = 0.75;
    		context.drawImage(img, 0, 0, canvas.width, canvas.height);
    		video.add(context);
    		context.clearRect(0,0,context.canvas.width,context.canvas.height);
    		context.globalAlpha = 0.8;
    		context.drawImage(img, 0, 0, canvas.width, canvas.height);
    		video.add(context);
    		context.clearRect(0,0,context.canvas.width,context.canvas.height);
    		context.globalAlpha = 0.85;
    		context.drawImage(img, 0, 0, canvas.width, canvas.height);
    		video.add(context);
    		context.clearRect(0,0,context.canvas.width,context.canvas.height);
    		context.globalAlpha = 0.9;
    		context.drawImage(img, 0, 0, canvas.width, canvas.height);
    		video.add(context);
    		context.clearRect(0,0,context.canvas.width,context.canvas.height);
    		context.globalAlpha = 0.95;
    		context.drawImage(img, 0, 0, canvas.width, canvas.height);
    		video.add(context);
    		context.clearRect(0,0,context.canvas.width,context.canvas.height);
    		context.globalAlpha = 1;
    		context.drawImage(img, 0, 0, canvas.width, canvas.height);

    		//this should be a loop based on some user input
    		for (var i=0; i<30; i++) {
        		video.add(context);
    		}
//    		
    		context.globalAlpha = 0.95;
    		context.drawImage(img, 0, 0, canvas.width, canvas.height);
    		video.add(context);
    		context.clearRect(0,0,context.canvas.width,context.canvas.height);
    		context.globalAlpha = 0.9;
    		context.drawImage(img, 0, 0, canvas.width, canvas.height);
    		video.add(context);
    		context.clearRect(0,0,context.canvas.width,context.canvas.height);
    		context.globalAlpha = 0.85;
    		context.drawImage(img, 0, 0, canvas.width, canvas.height);
    		video.add(context);
    		context.clearRect(0,0,context.canvas.width,context.canvas.height);
    		context.globalAlpha = 0.80;
    		context.drawImage(img, 0, 0, canvas.width, canvas.height);
    		video.add(context);
    		context.clearRect(0,0,context.canvas.width,context.canvas.height);
    		context.globalAlpha = 0.75;
    		context.drawImage(img, 0, 0, canvas.width, canvas.height);
    		video.add(context);
    		context.clearRect(0,0,context.canvas.width,context.canvas.height);
    		

    		ctx++;
    		finalizeVideo();
    	};
    	
    	img.src = dataUri;

    }


    function finalizeVideo(){
        //check if its ready
        if(ctx==filesarr.length){

            var start_time = +new Date;
            var output = video.compile();
            var end_time = +new Date;
            var url = webkitURL.createObjectURL(output);

            document.getElementById('awesome').src = url; //toString converts it to a URL via Object URLs, falling back to DataURL
            document.getElementById('download').style.display = '';
            document.getElementById('download').href = url;
            document.getElementById('status').innerHTML = "Compiled Video in " + (end_time - start_time) + "ms, file size: " + Math.ceil(output.size / 1024) + "KB";

        }

    }
});