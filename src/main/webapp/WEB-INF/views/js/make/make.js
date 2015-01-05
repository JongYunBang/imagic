$(document).ready(function(){
	
	///////////////////////////////////////  상수 선언부   ///////////////////////////////////////
	
	// 16:9 비율
	const ratio_16x9=0.5625;
	// 4:3 비율
	const ratio_4x3=0.75;
	// 미리보기 캔버스의 최대 해상도 값
	const maxSizeNum = 740;

	
	/////////////////////////////////////// 변수 선언부 	///////////////////////////////////////
    var drag = document.getElementById("drag");
    var createvideo = document.getElementById("createvideo");
    var files = document.getElementById("filesinput");

    var ctx = 0;

    var canvas = document.getElementById("canvas");
    var context = canvas.getContext("2d");

    // 동영상 제작을 위한 변수
    var video = new Whammy.Video(15);

    // 파일을 담기 위한 배열
    var filesarr = [];
    
    // 넘어온 파일 리스트 저장용
    var fileList=[];
    
    // 가장 큰 너비와 높이를 저장해서 비교하기 위한 변수
    var maxWidth=0;
	var maxHeight=0;
	
	// 화면비율 (16:9, 4:3) 조절을 위한 변수(기본값으로 16:9 할당)
	var ratio=ratio_16x9;
	
	// 유저세팅을 선택했을때를 나타낼 변수
	var userSet=false;
	
	// 동영상 작업 시간을 측정하기 위한 시작 시간
	var start_time; 
	
	// 똑같은 화면 재생을 위한 변수
	var insertFrame=40;
	
	// 방향 선택
	var imgDirection;
	
	// 비율 선택
	var imgRatio;
	
	// 화질 선택
	var imgSize = $('input[name=imgQuality]:checked').val().split("x");
	
	// 이전 화질 선택 버튼(취소 버튼 누를 시 사용하기 위해서)
	var prevQualityBtnName = $('input[name=imgQuality]:checked').attr("id");
	
	// 오프닝 미리보기 캔버스
	var openingCanvas = document.getElementById('opening');
	var openingCtx = openingCanvas.getContext('2d');
	
	// 엔딩 미리보기 캔버스 
	var endingCanvas = document.getElementById('ending');
	var endingCtx = endingCanvas.getContext('2d');
	
	// 오프닝, 엔딩 미리 보기 캔버스 너비 및 높이 
	var canvasWidth = 0;
	var canvasHeight = 0;
	
	var textWorking = false;		// 오프닝 엔딩 텍스트를 입력해서 작업중인지 여부
	var fontX = 0;						// 텍스트 X 좌표
	var fontY = 50;					// 텍스트 Y 좌표
	var increaseX = 10;				// X축 이동 증가량
	var increaseY = 10;				// Y축 이동 증가량
	var comment;						// 텍스트 코멘트 
	
	// 기본 폰트
	var currentFont = "Nanum Myeongjo";
	// 기본 폰트 사이즈
	var fontSize = 50;
	// 선택된 폰트 번호
	var selectFont =0;
	
	// 오프닝 엔닝 텍스트를 저장하기 위한 배열
	var openingTextArray = [];
	var endingTextArray = [];
	
	// 활성화 되어있는 캔버스
	var activeCanvas = openingCanvas;
	var activeCtx = activeCanvas.getContext('2d');
	
	// 활성화 되어있는 텍스트
	var activeTextArray = openingTextArray;
	
	
//////////////////////////////////////// 이벤트 리스너 ///////////////////////////////////////////
	
	// 가로, 세로 방향 radio버튼 이벤트
	$('input[name=imgDirection]').on('change', function(e) {
		e.preventDefault();
		if(textWorking) {
			if(!confirm("기존의 오프닝, 엔딩작업은 삭제됩니다. 진행하시겠습니까?")){
				if(imgDirection=="가로방향"){
					$('input[name=imgDirection]')[0].checked=true;	
				}else{
					$('input[name=imgDirection]')[1].checked=true;
				}
				return;
			}
		}
		changeRadioDirection();
		changeRadioRatio();
		resizeCanvas(imgRatio);
		resetText();
	});
	
	// 영상 비율 radio버튼 이벤트
	$('input[name=imgRatio]').on('change', function(e) {
		e.preventDefault();
		imgRatio=$('input[name=imgRatio]:checked').val();
		if(textWorking) {
			if(!confirm("기존의 오프닝, 엔딩작업은 삭제됩니다. 진행하시겠습니까?")){
				if(imgRatio=="16x9" || imgRatio=="9x16" ){
					$('input[name=imgRatio]')[1].checked=true;	
				}else{
					$('input[name=imgRatio]')[0].checked=true;
				}
				return;
			}
		}
		changeRadioRatio();
		resizeCanvas(imgRatio);
		resetText();
	});
	
	// 영상 Quality radio버튼 이벤트
	$('input[name=imgQuality]').on('change', function(e) {
		e.preventDefault();
		imgSize = $('input[name=imgQuality]:checked').val().split("x");
		if(textWorking) {
			if(!confirm("기존의 오프닝, 엔딩작업은 삭제됩니다. 진행하시겠습니까?")){
				$('#' + prevQualityBtnName)[0].checked = true;
				return;
			}
		}
		prevQualityBtnName = $('input[name=imgQuality]:checked').attr("id");
		
		resizeCanvas(imgRatio);
		resetText();
	});
	
	
	// 오프닝, 엔딩 탭 변경할 때 발생되는 이벤트
	$('#canvasPanel li').on('click', function(e) {
		if(e.currentTarget.innerText.trim()=="오프닝"){
			activeCanvas = openingCanvas;	
			activeTextArray = openingTextArray;
		}else if(e.currentTarget.innerText.trim()=="엔딩"){
			activeCanvas = endingCanvas;
			activeTextArray = endingTextArray;
		}
		activeCtx = activeCanvas.getContext('2d');
		selectFont =0;
		if(activeTextArray.length==0){
			textWorking = false;
			fontY= fontSize;
		}else{
			fontY = activeTextArray[activeTextArray.length-1].fontY+fontSize;
		}
	});
	
	
	// 폰트 선택할 때
	$('#textFont a').on('click', function(e) {
		e.preventDefault();
		
		console.log("text_changed");
		currentFont = e.currentTarget.dataset['text'];
		
		document.getElementById('fontTitle').innerHTML = e.currentTarget.innerHTML;
		activeTextArray[selectFont].currentFont = currentFont;
		drawText();
	});
	
	// 유저가 직접 입력하는 버튼을 눌렀을때 
	$('#userSetBn').on('click', function(e) {
		userSet=true;
		$("#preset").attr("style","display: none;");
		$("#userSetClose").attr("style","");
		$("#userSet").attr("style","");
		$("#userSetBn").attr("style", "display: none;");
	});
	
	// 유저지정 창 닫기 버튼 클릭시
	$('#userSetClose').on('click',function(e) {
		userSet=false;
		$("#preset").attr("style","");
		$("#userSet").attr("style","display: none;");
		$("#userSetClose").attr("style","display: none;");
		$("#userSetBn").attr("style", "");
		
	});
	
	// 텍스트 추가 버튼 클릭 시
	$('#titleDialogBtn').on('click', function(e) {
		if(addTextArray()==true){
			if (!textWorking){
				textWorking = true;
			}else{
				selectFont++;
			}
			fontY = activeTextArray[selectFont].fontY+ 50;
			drawText();
		}
	
	});
	
	// 오른쪽 버튼 이벤트
	$('#titleDialogRight').on('click', function() {
		if(textWorking) {
			activeTextArray[selectFont].fontX = activeTextArray[selectFont].fontX + increaseX; 
			drawText();
		}
	});
	
	// 왼쪽 버튼 이벤트
	$('#titleDialogLeft').on('click', function() {
		if(textWorking) {
			activeTextArray[selectFont].fontX = activeTextArray[selectFont].fontX-increaseX;
			drawText();
		}
	});
	
	// 위 버튼 이벤트
	$('#titleDialogUp').on('click', function() {
		if(textWorking) {
			activeTextArray[selectFont].fontY = activeTextArray[selectFont].fontY-increaseY;
			drawText();
		}
	});
	
	// 아래 버튼 이벤트
	$('#titleDialogDown').on('click', function() {
		if(textWorking) {
			activeTextArray[selectFont].fontY = activeTextArray[selectFont].fontY+increaseY;
			drawText();
		}
	});
	
	// createvedio 버튼 클릭시 동영상 제작에 들어가는 함수
	createvideo.addEventListener("click", function(e) {
		if(!textWorking) {
			if(confirm("오프닝과 엔딩을 삽입하시면 더욱 더 좋은 품질의 영상으로 보관하실 수 있습니다. 계속 진행하시겠습니까?")){
				
			}else{
				return;
			}
		}
		
		if(textWorking){
			openEndingSave();
		}
		
		$("#inputText").attr("class", "collapse");
		this.classList.add('loading');
		
		// TODO : 미리보기 Canvas에 저장된 픽셀값을 실제 비율에 맞는 Canvas로 증가시켜서 저장해야한다.
		
        document.getElementById('status').innerHTML = 
        								"영상을 제작중입니다..... <br/>" +
        								"선택하신 품질과 컴퓨터 성능에 따라 몇 초에서 몇 분의 시간이 소요됩니다.<br/>" +
        								"화면이 멈추는 현상이 발생할 수 있습니다.";
        document.getElementById('awesome').src = "";
        ctx = 0;
        
        start_time = +new Date;
        // 사용자가 프리셋 이용시
        if(!userSet){
        	// 캔버스에 들어갈 이미지 크기 구해오기 위해서
        	var imgSize = $('input[name=imgQuality]:checked').val().split("x");
        	// 여기가 선택된 화질 값을 구할 수 있는 부분 (위 소스)
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
	
	
    // BACK 버튼
    $('#makeBackBtn').on('click', function(e) {
		document.getElementById('makeBack').submit();
	});
    
	
//////////////////////////////////////// 함수 선언부 ////////////////////////////////////////////////////////
	
	// 오프닝, 엔딩 저장하기 버튼 눌렀을 때 
	function openEndingSave() {
		// 오프닝과 엔딩이 이전에 들어가 있으면 먼저 제거 해준다.
		if(filesarr.length == 11) {
			filesarr.pop();
			filesarr.shift();
		}
		// 실제 화면 비율대로 저장하기 위한 논리 Canvas
		var saveTitleCanvas = document.createElement('canvas');
		var saveTitleCtx = saveTitleCanvas.getContext('2d');
		
		// 미리보기와 실제 화면의 차이 비율
		var expandRatio = (parseInt((imgSize[0]/maxSizeNum)*1000)+1)/1000;
		console.log(expandRatio);
		if(expandRatio < 1){
			expandRatio = 1;
		}
		saveTitleCanvas.width = imgSize[0];
		saveTitleCanvas.height =imgSize[1];
		
		// 오프닝 저장
		activeCanvas = saveTitleCanvas;
		activeCtx = saveTitleCtx;
		activeTextArray = openingTextArray;
		drawText(expandRatio);
		filesarr.unshift(saveTitleCanvas.toDataURL("image/png"));
		
		// 엔딩 저장
		activeTextArray = endingTextArray;
		drawText(expandRatio);
		filesarr.push(saveTitleCanvas.toDataURL("image/png"));
	}
    
    

	// 가로 뱡향 세로 방향 변경 시 값 변경
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
    
	// 비율 Radio버튼 변경시 값 변경
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
	
	// 오프닝, 엔딩 텍스트 값들 초기화
	function resetText(){
		console.log(activeTextArray);
		console.log(openingTextArray);
		console.log(endingTextArray);
		console.log(textWorking);
		
		textWorking = false;		// 오프닝 텍스트를 입력해서 작업중인지 여부
		fontX = 0;						// X 좌표
		fontY = 50;					    // Y 좌표
		comment;						// Comment

		openingTextArray = [];
		endingTextArray = [];
		
		currentFont;
		selectFont =0;
	}
	
	// 텍스트 추가하는 함수
	function addTextArray(){
		
		comment = prompt("텍스트를 입력해주세요!");
		if(comment == null || comment.trim() == "" || comment == "") {
			return false;
		}
		activeTextArray = ($('#canvasPanel li.active a')[0].innerHTML=='오프닝' ? openingTextArray : endingTextArray);
		activeTextArray.push({
			comment : comment,
			fillStyle : "#FFFFFF",
			font : fontSize,
			currentFont : currentFont,
			fontX : fontX,
			fontY : fontY
		});
		return true;
	}
	
	// 텍스트 그리는 함수
	function drawText(expandRatio){
//		if(textWorking) {
//			console.log("drawText");
//			activeCtx.fillStyle = "#000000";
//			activeCtx.fillRect(0, 0,  activeCanvas.width, activeCanvas.height);
//			for(var i =0; i < activeTextArray.length; i++){
//				activeCtx.fillStyle = activeTextArray[i].fillStyle;
//				var fontString = activeTextArray[i].font + "px " +  activeTextArray[i].currentFont;
//				activeCtx.font = fontString;
//				activeCtx.fillText(activeTextArray[i].comment, activeTextArray[i].fontX, activeTextArray[i].fontY, activeCanvas.width);	
//			}
//		}
		console.log(activeTextArray);
		console.log(openingTextArray);
		console.log(endingTextArray);
		console.log(textWorking);
			if(textWorking) {
			console.log("drawText");
			if(!expandRatio || expandRatio < 1) {
				expandRatio = 1;
			}
			activeCtx.fillStyle = "#000000";
			activeCtx.fillRect(0, 0,  activeCanvas.width, activeCanvas.height);
			for(var i =0; i < activeTextArray.length; i++){
				activeCtx.fillStyle = activeTextArray[i].fillStyle;
				var fontString = parseInt(activeTextArray[i].font * expandRatio)  + "px " +  activeTextArray[i].currentFont;
				activeCtx.font = fontString;
				activeCtx.fillText(activeTextArray[i].comment, parseInt(activeTextArray[i].fontX * expandRatio), parseInt(activeTextArray[i].fontY * expandRatio), activeCanvas.width);	
			}
		}
	}
	
	// 미리보기 사이즈 리사이징
	function resizeCanvas(imgRatio){
		imgSize = $('input[name=imgQuality]:checked').val().split("x");
		if(imgRatio=="16x9"){
			canvasWidth = maxSizeNum;
			canvasWidth = (imgSize[0] > canvasWidth) ? canvasWidth : imgSize[0] ;
			canvasHeight = canvasWidth * ratio_16x9;
		}else if(imgRatio=="4x3"){
			canvasWidth = maxSizeNum;
			canvasWidth = (imgSize[0] > canvasWidth) ? canvasWidth : imgSize[0];
			canvasHeight = canvasWidth * ratio_4x3;			
		}else if(imgRatio=="9x16"){
			canvasHeight = maxSizeNum;
			canvasHeight = (imgSize[1] > canvasHeight) ? canvasHeight : imgSize[1] ;
			canvasWidth = canvasHeight * ratio_16x9;
		}else if(imgRatio=="3x4"){
			canvasHeight = maxSizeNum;
			canvasHeight = (imgSize[1] > canvasHeight) ? canvasHeight : imgSize[1];
			canvasWidth = canvasHeight * ratio_4x3;
		}
		openingCanvas.width = canvasWidth;
		openingCanvas.height = canvasHeight;
		openingCtx.fillStyle = '#000000';
		openingCtx.fillRect(0, 0, openingCanvas.width, openingCanvas.height);
		
		endingCanvas.width = canvasWidth;
		endingCanvas.height = canvasHeight;
		endingCtx.fillStyle = '#000000';
		endingCtx.fillRect(0, 0, endingCanvas.width, endingCanvas.height);
		
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
			for(var i=0; i<fileList.length; i++){
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
			
			/* 열우 1월 2일 작업  */
			// 선택된 방향에 맞게 CANVAS 크기 지정
			resizeCanvas(imgRatio);
		}
		function onError(data) {
			alert("파일 받아오기 실패");
		}
	}
 
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
    		
    		//마지막 부분 fadeout처리 하기 위해서
    		if (ctx==filesarr.length){
        		context.clearRect(0,0,context.canvas.width,context.canvas.height);
        		context.globalAlpha = 0.7;
        		context.drawImage(img, 0, 0, canvas.width, canvas.height);
        		video.add(context);
        		context.clearRect(0,0,context.canvas.width,context.canvas.height);
        		context.globalAlpha = 0.6;
        		context.drawImage(img, 0, 0, canvas.width, canvas.height);
        		video.add(context);
        		context.clearRect(0,0,context.canvas.width,context.canvas.height);
        		context.globalAlpha = 0.5;
        		context.drawImage(img, 0, 0, canvas.width, canvas.height);
        		video.add(context);
        		context.clearRect(0,0,context.canvas.width,context.canvas.height);
        		context.globalAlpha = 0.4;
        		context.drawImage(img, 0, 0, canvas.width, canvas.height);
        		video.add(context);
        		context.clearRect(0,0,context.canvas.width,context.canvas.height);
        		context.globalAlpha = 0.3;
        		context.drawImage(img, 0, 0, canvas.width, canvas.height);
        		video.add(context);
        		context.clearRect(0,0,context.canvas.width,context.canvas.height);
        		context.globalAlpha = 0.2;
        		context.drawImage(img, 0, 0, canvas.width, canvas.height);
        		video.add(context);
        		context.clearRect(0,0,context.canvas.width,context.canvas.height);
        		context.globalAlpha = 0.1;
        		context.drawImage(img, 0, 0, canvas.width, canvas.height);
        		video.add(context);
        		context.clearRect(0,0,context.canvas.width,context.canvas.height);
        		context.globalAlpha = 0.0;
        		context.drawImage(img, 0, 0, canvas.width, canvas.height);
        		video.add(context);
    		}
    		finalizeVideo();
    	};
    	
    	img.src = dataUri;

    }

    function finalizeVideo(){
        //check if its ready
        if(ctx==filesarr.length){
        		document.getElementById("createvideo").classList.remove('loading');
            var output = video.compile();
            var end_time = +new Date;
            var url = webkitURL.createObjectURL(output);

            document.getElementById('awesome').src = url; //toString converts it to a URL via Object URLs, falling back to DataURL
            document.getElementById('download').style.display = '';
            document.getElementById('download').href = url;
            document.getElementById('status').innerHTML = "동영상 제작시간 : " + (end_time - start_time) / 1000+ "초, 파일크기: " + Math.ceil(output.size / 1024) + "KB";

        }

    }
    
});