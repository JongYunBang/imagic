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
    var maxWidth=0;
	var maxHeight=0;
	
	// 상수 선언 
	const ratio_16x9=0.5625;
	const ratio_4x3=0.75;
	// 화면비율 (16:9, 4:3) 조절을 위한 변수(기본값으로 16:9 할당)
	var ratio=ratio_16x9;
	// 유저세팅을 선택했을때를 나타낼 변수
	var userSet=false;
	
	var openingCanvas = document.getElementById('opening');
	var openingCtx = openingCanvas.getContext('2d');
	var canvasWidth = 0;
	var canvasHeight = 0;
	
	
	var textWorking = false;		// 오프닝 텍스트를 입력해서 작업중인지 여부
	var fontX = 0;						// 이동 X 좌표
	var fontY = 50;					// 이동 Y 좌표
	var increaseX = 10;				// X축 이동 증가량
	var increaseY = 10;				// Y축 이동 증가량
	var comment;						// Comment

	var textArray = [];
	var currentFont;
	var selectFont =0;
	
	$('#textFont').on('change', function(e) {
		currentFont = $('#textFont').val();
		textArray[selectFont].currentFont = currentFont;
		drawText();
	});
	
	function resetText(){
		textWorking = false;		// 오프닝 텍스트를 입력해서 작업중인지 여부
		fontX = 0;						// 이동 X 좌표
		fontY = 50;					// 이동 Y 좌표
		comment;						// Comment

		textArray = [];
		currentFont;
		selectFont =0;
	}
	// 2015. 1. 2 열우 
	function addTextArray(){
		if(!textWorking){
			comment = prompt("텍스트를 입력해주세요!");
			textArray.push({
				comment : comment,
				fillStyle : "#FFFFFF",
				font : "50px ",
				currentFont : currentFont,
				fontX : fontX,
				fontY : fontY
			});
			textWorking = true;
		}
	}
	
	$('#titleDialogBtn').on('click', function(e) {
//		$('#titleDialog').dialog({
//			dialogClass: "no-close"
//		});
		if (!textWorking){
			addTextArray();
			drawText();
		}else {
			if(confirm("기존에 작업하던 텍스트를 저장하고 새로 추가하시겠습니까?")){
				if(selectFont < 2){
					textWorking = false;
					fontY = textArray[selectFont].fontY+ 50;
					selectFont++;
					addTextArray();
					drawText();	
				}else{
					alert("최대 3개의 문자열만 입력하실 수 있습니다.");
				}
			}
		}
	});
	
	$('#titleDialogRight').on('click', function() {
		if(textWorking) {
			textArray[selectFont].fontX = textArray[selectFont].fontX + increaseX; 
			drawText();
		}
	});
	
	$('#titleDialogLeft').on('click', function() {
		if(textWorking) {
			textArray[selectFont].fontX = textArray[selectFont].fontX-increaseX;
			drawText();
		}
	});
	
	$('#titleDialogUp').on('click', function() {
		if(textWorking) {
			textArray[selectFont].fontY = textArray[selectFont].fontY-increaseY;
			drawText();
		}
	});
	
	$('#titleDialogDown').on('click', function() {
		if(textWorking) {
			textArray[selectFont].fontY = textArray[selectFont].fontY+increaseY;
			drawText();
		}
	});
	
	function drawText(){
		if(textWorking) {
			openingCtx.fillStyle = "#000000";
			openingCtx.fillRect(0, 0,  openingCanvas.width, openingCanvas.height);
			for(var i =0; i < textArray.length; i++){
				openingCtx.fillStyle = textArray[i].fillStyle;
				openingCtx.font = textArray[i].font +  textArray[i].currentFont;
				openingCtx.fillText(textArray[i].comment, textArray[i].fontX, textArray[i].fontY, openingCanvas.width);
			}
		}
	}
	
	init();
	
	function init() {
		var imgDirection;
		var imgRatio;
		
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
			
			// 최대 가로와 최대 세로의 길이 비교로 화면에 미리 띄워줄 글과 화면비율 선택하기
			if(maxWidth>=maxHeight){
				$("#step1Str").html("'가로방향을 추천드립니다.'");
				insertVerValue(maxWidth, ratio_16x9);
				$('input[name=imgDirection]')[0].checked=true;
				imgRatio = "16x9";
			} else {
				$('#step1Str').html("세로방향을 추천드립니다.");
				insertHorValue(maxHeight, ratio_16x9);
				$('input[name=imgDirection]')[1].checked=true;
				imgRatio = "9x16";
			}
			changeRadioDirection();
			
		}
		function onError(data) {
			alert("파일 받아오기 실패");
		}
		
		// step1 선택에 의해 sept2, step3 내용 보여주기 위해서

		$('input[name="imgDirection"]').change(function() {
			// 열우가 옮겨놓음으로
			if(textWorking) {
				if(!confirm("기존에 있던 오프닝, 엔딩작업은 삭제됩니다. 진행하시겠습니까?")){
					if(imgDirection=="가로방향"){
						$('input[name=imgDirection]')[0].checked=true;	
					}else{
						$('input[name=imgDirection]')[1].checked=true;
					};	
					return;
				}
			}
			changeRadioDirection();
			changeRadioRatio();
			resizeCanvas(imgRatio);
			resetText();
		});
		
		// 열우가 옮겨놓음으로
		function changeRadioDirection(){
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
				
				// TODO : 오프닝/엔딩 페이지 가로 세로 방향에 맞는  미리 보기 CANVAS 크기 변경
				
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
		}
		// step 의 선택에 의해 상수 대입값 변화시켜주기위해
		$('input[name=imgRatio]').change(function() {
			//열우 옮김
			changeRadioRatio();
			resizeCanvas(imgRatio);
		});
		// 열우 옮김 
		function changeRadioRatio(){
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
		}

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
		
		/* 열우 1월 2일 작업  */
		// 선택된 방향에 맞게 CANVAS 크기 지정
		resizeCanvas(imgRatio);
	}
    
	function resizeCanvas(imgRatio){
//		var openingCanvas = document.getElementById('opening');
//		var openingCtx = openingCanvas.getContext('2d');
//		var canvasWidth = 0;
//		var canvasHeight = 0;
		if(imgRatio=="16x9"){
			canvasWidth = 740;
			canvasHeight = 416.25;
		}else if(imgRatio=="4x3"){
			canvasWidth = 740;
			canvasHeight =555;			
		}else if(imgRatio=="9x16"){
			canvasWidth = 416.25;
			canvasHeight =740;
		}else if(imgRatio=="3x4"){
			canvasWidth = 555;
			canvasHeight =740;			
		}
		openingCanvas.width = canvasWidth;
		openingCanvas.height = canvasHeight;
		openingCtx.fillStyle = '#000000';
		openingCtx.fillRect(0, 0, openingCanvas.width, openingCanvas.height);
		
		// drawzone 크기도 변경
		var drawzoneElement = document.getElementById('drawzone');
		drawzoneElement.width = canvasWidth;
		drawzoneElement.height = canvasHeight;
	}
	/****여기까지*******/
	
	
	
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
		document.getElementById('imgHiSpan').innerHTML= "높은화질 (" + parseInt(maxInHeight*ratio)+" x "+maxInHeight + ")";
		document.getElementById('imgMiddle').value=parseInt(midVal*ratio)+"x"+midVal;
		document.getElementById('imgMiddleSpan').innerHTML="중간화질 (" +parseInt(midVal*ratio)+" x "+midVal + ")";
		document.getElementById('imgLow').value=parseInt(lowVal*ratio)+"x"+lowVal;
		document.getElementById('imgLowSpan').innerHTML= "낮은화질 (" + parseInt(lowVal*ratio)+" x "+lowVal + ")";
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

    		
    		// 오프닝 삽입 부분
    		
    	
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
    		

    		// 엔딩 삽입 부분
    		
    		
    		
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