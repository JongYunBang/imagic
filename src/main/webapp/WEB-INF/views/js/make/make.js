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
    // 로딩이미지 띄우기 위한 시간 벌기용
    
    // 넘어온 파일 리스트 저장용
    var fileList=[];
    var maxWidth=0;
	var maxHeight=0;
	
	// 상수 선언 
	const ratio_16x9=0.5625;
	const ratio_4x3=0.75;
	// 화면비율 (16:9, 4:3) 조절을 위한 변수(기본값으로 16:9 할당)
	var ratio=ratio_16x9;
	// 유저세팅을 선택했을때를 나타낼 변수
	var userSet=false;
	$('#processing-modal').modal('show');
	
	init();
	function init() {

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

			// 받은 이미지 파일의 가로 최대길이와 세로 최대길이 구함    
			for(var i=0; i<fileList.length-2; i++){
				var img = new Image();
				img.src=filesarr[i]=fileList[i].imgBase64;

//				width+=img.width;
//				height+=img.height;

				// 처음 파일을 초기값으로 지정
				if(i==0){
					maxWidth=img.width;
					maxHeight=img.height;
				} else {
					// 크다면 값 교체로 최대값 입력
					if(maxWidth<img.width) {
						maxWidth=img.width;
					}
					if(maxHeight<img.height){
						maxHeight=img.height;
					}
				}
			}
			$('#processing-modal').modal('hide');
			// 최대 가로와 최대 세로의 길이 비교로 화면에 미리 띄워줄 글과 화면비율 선택하기
			if(maxWidth>=maxHeight){
				$("#step1Str").html("'가로방향을 추천드립니다.'");
				insertVerValue(maxWidth, ratio_16x9);
				$('input[name=imgDirection]')[0].checked=true;
			} else {
				$('#step1Str').html("세로방향을 추천드립니다.");
				insertHorValue(maxHeight, ratio_16x9);
				$('input[name=imgDirection]')[1].checked=true;
			}
		}
		function onError(data) {
			alert("파일 받아오기 실패");
		}


		// step1 선택에 의해 sept2, step3 내용 보여주기 위해서
		var imgDirection;
		$('input[name="imgDirection"]').change(function() {
			imgDirection = $('input:radio[name=imgDirection]:checked').val();
			if(imgDirection=="가로방향") {
				document.getElementById('ratio16x9').value="16x9";
				document.getElementById('ratio16x9span').innerHTML="16x9";
				document.getElementById('ratio4x3').value="4x3";
				document.getElementById('ratio4x3span').innerHTML="4x3";
				if($('input[name=imgRatio]:checked').val()=="16x9") {
					insertVerValue(maxWidth, ratio_16x9);
				} else if ($('input[name=imgRatio]:checked').val()=="4x3") {
					insertVerValue(maxWidth, ratio_4x3);
				}
			} else if(imgDirection=="세로방향") {
				document.getElementById('ratio16x9').value="9x16";
				document.getElementById('ratio16x9span').innerHTML="9x16";
				document.getElementById('ratio4x3').value="3x4";
				document.getElementById('ratio4x3span').innerHTML="3x4";
				if($('input[name=imgRatio]:checked').val()=="9x16") {
					insertHorValue(maxHeight, ratio_16x9);
				} else if ($('input[name=imgRatio]:checked').val()=="3x4") {
					insertHorValue(maxHeight, ratio_4x3);
				} 
			}
		});

		// step 의 선택에 의해 상수 대입값 변화시켜주기위해
		var imgRatio;
		$('input[name=imgRatio]').change(function() {
			imgRatio=$('input[name=imgRatio]:checked').val();
			if(imgRatio=="16x9") {
				insertVerValue(maxWidth, ratio_16x9);
			} else if (imgRatio=="4x3") {
				insertVerValue(maxWidth, ratio_4x3);
			} else if (imgRatio=="9x16") {
				insertHorValue(maxHeight, ratio_16x9);
			} else if (imgRatio=="3x4") {
				insertHorValue(maxHeight, ratio_4x3);
			}
		});

		// 유저가 직접 입력하는 버튼을 눌렀을때 
		$('#userSetBn').click(function() {
			userSet=true;
			$("#preset").attr("style","display: none;");
			$("#userSetClose").attr("style","");
			$("#userSet").attr("style","");
			$("#userSetBn").attr("style", "display: none;");

		});
		// 유저지정 창 닫기 버튼 클릭시
		$('#userSetClose').click(function() {
			userSet=false;
			$("#preset").attr("style","");
			$("#userSet").attr("style","display: none;");
			$("#userSetClose").attr("style","display: none;");
			$("#userSetBn").attr("style", "");

		});

	}
	// 가로 방향 선택시에 값 넣어주는 함수 
	function insertVerValue(maxInWidth, ratio) {
		var midVal = parseInt(maxInWidth*0.7);
		var lowVal = parseInt(maxInWidth*0.5);
		document.getElementById('imgHi').value= maxInWidth+" x "+parseInt(maxInWidth*ratio);
		document.getElementById('imgHiSpan').innerHTML= "높은화질 (" + maxInWidth+" x "+parseInt(maxInWidth*ratio) + ")";
		document.getElementById('imgMiddle').value=midVal+" x "+parseInt(midVal*ratio);
		document.getElementById('imgMiddleSpan').innerHTML= "중간화질 (" + midVal+" x "+parseInt(midVal*ratio) + ")";
		document.getElementById('imgLow').value=lowVal+" x "+parseInt(lowVal*ratio);
		document.getElementById('imgLowSpan').innerHTML= "낮은화질 (" + lowVal+" x "+parseInt(lowVal*ratio) + ")";
	}
	
	// 세로 방향 선택시에 값 넣어주는 함수
	function insertHorValue(maxInHeight, ratio) {
		var midVal = parseInt(maxInHeight*0.7);
		var lowVal = parseInt(maxHeight*0.5);
		document.getElementById('imgHi').value=parseInt(maxInHeight*ratio)+"x"+maxInHeight;
		document.getElementById('imgHiSpan').innerHTML= "높은화질 (" + parseInt(maxInHeight*ratio)+"x"+maxInHeight + ")";
		document.getElementById('imgMiddle').value=parseInt(midVal*ratio)+"x"+midVal;
		document.getElementById('imgMiddleSpan').innerHTML="중간화질 (" +parseInt(midVal*ratio)+"x"+midVal + ")";
		document.getElementById('imgLow').value=parseInt(lowVal*ratio)+"x"+lowVal;
		document.getElementById('imgLowSpan').innerHTML= "낮은화질 (" + parseInt(lowVal*ratio)+"x"+lowVal + ")";
	}
	
	// 똑같은 화면 재생을 위한 변수
	var insertFrame=40;
	// createvedio 버튼 클릭시 동영상 제작에 들어가는 함수
	createvideo.addEventListener("click", function() {
		$("#inputText").attr("class", "collapse");
        document.getElementById('status').innerHTML = "영상을 제작중입니다. 선택하신 품질과 <br/> 컴퓨터 성능에 따라 시간이 걸릴수도 있습니다";
        document.getElementById('awesome').src = "";
        ctx = 0;
        
        // 사용자가 프리셋 이용시
        if(!userSet){
        	// 캔버스에 들어갈 이미지 크기 구해오기 위해서
        	var imgSize = $('input[name=imgQuality]:checked').val().split("x");
        	canvas.width = parseInt(imgSize[0]);
        	canvas.height = parseInt(imgSize[1]);
        	video = new Whammy.Video($('input[name=imgRunTime]:checked').val());
        } else {
        // 사용자가 유저세팅 이용시
        	 canvas.width = document.getElementById("width").value;
             canvas.height = document.getElementById("height").value;
             video = new Whammy.Video(document.getElementById("framerate").value);
        }
        //if we have images loaded
        if(filesarr.length>0){
        	// 사용자가 프리셋 이용시
        	if (!userSet){
        		//loop through them and process
        		for(i=0; i<filesarr.length; i++) {
        			var file = filesarr[i];
        			if ($('input[name=imgRunTime]:checked').val()=="16"){
        				insertFrame=25;
        				process(file, insertFrame);
        			} else if ($('input[name=imgRunTime]:checked').val()=="9"){
        				insertFrame=29
        				process(file, insertFrame);
        			} else if ($('input[name=imgRunTime]:checked').val()=="6"){
        				insertFrame=42;
        				process(file, insertFrame);
        			} else if ($('input[name=imgRunTime]:checked').val()=="5"){
        				insertFrame=54;
        				process(file, insertFrame);
        			}
        		}
        	} else {
        	// 사용자가 유저세팅 이용시
        		insertFrame=40;
        		 //loop through them and process
                for(i=0; i<filesarr.length; i++) {
                    var file = filesarr[i];
                        process(file, insertFrame);
                }
        	}
        } else {
        	document.getElementById('status').innerHTML = "파일을 불러오는데 오류가 발생하였습니다.<br/> 다시 시도해 주십시요";
        }

    }, false);

    /* main process function */
    function process(file, insertFrame) {
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
    		for (var i=0; i<insertFrame; i++) {
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
            document.getElementById('status').innerHTML = "동영상 제작시간 " + (end_time - start_time) + "ms, 파일크기: " + Math.ceil(output.size / 1024) + "KB";
        }

    }
    
    // BACK 버튼
    $('#makeBackBtn').on('click', function(e) {
		document.getElementById('makeBack').submit();
	})
    
    
    
});