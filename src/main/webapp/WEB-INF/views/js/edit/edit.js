
$(document).ready(function() {

	///////////////////////////////////// 변수 선언부 	///////////////////////////////////////
	
	// 캔버스 크기 및 이름 상수변수
	var canvasMaxWidth = 800;
	var canvasMaxHeight = 500;
	var canvas_name = 'draw';           // Canvas의 이름
	
	// 불러온 이미지 처리를 위한 변수 들
    var drawzoneElement = document.getElementById("drawzone"); // replaceChild하기 위한 drawzone
	var fileList=[]; 	// 불러온 파일의 리스트 
	var currentFile=null; // 현재 선택된 개체에 대한 FileVO의 정보저장
	var thumbnailSrc=null; // 현재 선택된 개체의 썸네일 주소를 저장하기 위한 변수
    var sourceImage;		// 원본 이미지
    var initCanvas;     // 화면에 보여주는 미리보기 Canvas
    var initCtx;          // initCanvas의 context
    var initWidth;      // initCanvas Width
    var initHeight;     // initCanvas Height
    var copyImage;      // 미리보기 화면의getImageData값
	var ratio;					// 이미지 축소 비율
    
	// 필터 및 프리셋 변수들
    var filterList = {};        // Filter의 리스트를 담는 객체
    var filterSetting = document.getElementsByClassName("FilterSetting");
    var btnPresets = document.getElementById("PresetFilters").querySelectorAll("a");
    var activePreset = null		// 최종적으로 적용한 preset을 의미
    
    // redo, undo 변수들
    var cPushArray = new Array();   // redo, undo 저장 array
    var cStep = 0;								// 현재 그림의 순서
    
    // 텍스트 부분 변수들
    var TextArray = [];				// 텍스트를 저장하기 위한 배열
	var textWorking = false;		// 텍스트 입력중인지 여부
	var textAdding = false;		// 텍스트 추가 여부
	var fontX = 0;						// 텍스트 X 좌표
	var fontY = 50;					// 텍스트 Y 좌표
	var increaseX = 10;				// X축 이동 증가량
	var increaseY = 10;				// Y축 이동 증가량
	var comment;						// 텍스트 코멘트
	var currentFont = "Nanum Myeongjo"; 	// 기본 폰트
	var fontSize = 32; 	// 기본 폰트 사이즈
	var selectFont =0; 	// 선택된 폰트 번호
	var exRatio;			// 텍스트가 확대 되거나 축소된 비율
    
    // 초기 실행 함수
    imgLoad();
    addFilterEvent();
    
////////////////////////////////////// 함수 선언부 ///////////////////////////////////////////    
    
    function imgLoad() {
		// 서버에서 파일 리스트 받아오기 위한 ajax
		$.ajax({
			type : "POST",
			url : "/imgLoad",
			data : {
				"m_id" : $('#sessionID').val(),
				"dirName" : $('#sessionDirName').val()
			},
			success : onSuccess,
			error : onError
		});
		
		function onSuccess(data) {
			inputDisable();
			fileList = data;
			var imgThumbArray =[];   // 썸네일 저장용
			for (var i=0; i<data.length; i++) {
				var id = data[i].m_id;
				var dirName = data[i].dirName;
				var imgOriName = data[i].imgOriName;
				var imgLength=data[i].imgLength;
				var file = data[i].imgThumb;
				var imgNum=data[i].imgNum;
				imgThumbArray[i] = {
						"file" : file,
						"name" : imgOriName,
						"size" : imgLength,
						"imgNum" : imgNum
				}
			}
			// thumbNail에게 썸네일 배열을 넘김
			thumbNail.createFileElement(imgThumbArray);
			
		}
		function onError(data) {
			alert("이미지 불러오기 실패");
		}
    }
    
    
    function addFilterEvent() {
    	// Filter에 이벤트 적용
        for (var i = 0; i < filterSetting.length; i++) {
            var inputBtn = filterSetting[i].querySelector("input");
            inputBtn.addEventListener("change", function (e) {
                // 현재 data-filter Attribute의 값 ("brightness")
                var filterName = e.target.parentElement.parentElement.children[0].innerHTML;
                // 현재 filter의 value값 ("66")
                var filterValue = e.target.value;
                // filterValue span에 filterValue 값을 나타낸다.
                e.target.nextElementSibling.innerHTML = filterValue;
                if(imageLoading){
    	            	var type = {
    	            			name : "filter",
    	            			filterName : filterName,
    	            			filterValue : filterValue
    	            			}
                		_applyFilter(type);
                }
            }, false);
        }
        
        // preset버튼에 이벤트 적용
        for(var ii = 0; ii< btnPresets.length; ii++){
        		var btnPreset= btnPresets[ii];
        		btnPreset.addEventListener("click", function(e) {
	    			if(imageLoading){ 
	    				var text = e.target.textContent;
	    				e.target.innerHTML = "Rendering...";
	    				var type = {
	    						name : "preset",
	    						presetName : e.target.attributes[0].value,
	    						text : text
	    				}
	    				editReset();
	    				_applyFilter(type, e.target);
	    			}
        		}, false);
        }
    }
    
    function _applyFilter(type, element) {
    	// 바로 렌더링을 거치면 화면이 revert되었다가 적용되기 때문에 깜박임이 일어난다.
        // 방지하기 위해 논리적인 canvas에 그려준 후 그린 그 그림을 다시 원래 canvas에 넣어준다.
        var logicCanvas = document.createElement('canvas');
        var logicCtx = logicCanvas.getContext('2d');
        // 논리캔버스의 크기를 현재 draw캔버스의 크기에 맞게 설정한다.
        // canvas.id = canvas_name;
        logicCanvas.width = initWidth;
        logicCanvas.height = initHeight;
        document.getElementById("saveCanvas").removeAttribute("disabled");
    	
        if(type.name =="filter"){
        		if((filterList[type.filterName]=="gamma" &&  type.filterValue ==0)) {
        			delete filterList[type.filterName]; 
        		}else{
        			filterList[type.filterName] = type.filterValue;
        		}
        }else if(type.name=="preset") {
    			activePreset = type.presetName;
        }
        
        logicCtx.putImageData(copyImage, 0, 0);
        // 논리 canvas에 값을 적용한다.
        Caman(logicCanvas, function () {
            logicCanvas.id = canvas_name;
            if (activePreset != null) {
            		this[activePreset]();
            }
            var attrs = Object.keys(filterList);
            for (var i = 0; i < attrs.length; i++) {
                if (parseInt(filterList[attrs[i]]) != 0) {
                    this[attrs[i]](parseInt(filterList[attrs[i]]));
                }
            };	
            inputDisable();
            this.render(function() {
            		cPush(this.canvas, type);
            		inputEnable();
			});
            drawText(document.getElementById('draw'), document.getElementById('draw').getContext('2d'));
        });
        
        // 렌더링하는 시간이 있기 때문에 replace를 지연해준다.
        var b = function () {
        	drawzoneElement.replaceChild(logicCanvas, document.getElementById(canvas_name));
	        	if(element) {
	        		element.innerHTML = type.text;
	        	}
        };
        setTimeout(b, 800);
    }
    
	//랜더링 중에는 모두 Disable한다.
	function inputDisable() {
		// filterSetting 모든 range값 0으로 초기화
		for (var i = 0; i < filterSetting.length; i++) {
              var inputBtn = filterSetting[i].querySelector("input");
              	inputBtn.disabled = true;
		}
	}
	
	//렌더링 후에는 다시 활성화한다.
	function inputEnable() {
		// filterSetting 모든 range값 0으로 초기화
		for (var i = 0; i < filterSetting.length; i++) {
              var inputBtn = filterSetting[i].querySelector("input");
              	inputBtn.disabled = false;
		}
	}
	
	function editReset() {
		// filterList 및 preset 초기화
		filterList = {};
		
		// filterSetting 모든 range값 0으로 초기화
		for (var i = 0; i < filterSetting.length; i++) {
              var inputBtn = filterSetting[i].querySelector("input");
              	inputBtn.value = 0;
              	inputBtn.nextElementSibling.innerHTML = 0;
		}
	}
	
	function resetVariable() {
		cStep = 1;
		editReset();
		filterList = {};
		activePreset = null;
		btnAble();
	}
	
	function cPush(canvas, type) {
		// push를 했을 때는 현재 Step만큼만 데이터가 존재한다.(가장 끝인 상태이기 때문)
		cPushArray.length = cStep;
		cStep++;
		// 초기 사진임을 알린다.
		if(!type){
			type="init";
		}
		
		cPushArray.push({
			type : type,
			dataURL : canvas.toDataURL()
		});
		
		btnAble();
	}
	
	function cRedo() {
		var currentType = cPushArray[cStep].type.name;
		if(currentType == "filter") {
			var dataFilter = "[data-filter=" + cPushArray[cStep].type.filterName + "]";
			$(dataFilter)[0].value = cPushArray[cStep].type.filterValue;
			$(dataFilter)[0].nextElementSibling.innerHTML = cPushArray[cStep].type.filterValue;
			filterList[cPushArray[cStep].type.filterName] = cPushArray[cStep].type.filterValue;
		}else if(currentType == "preset") {
			editReset();
			filterList = {};
			activePreset = cPushArray[cStep].type.presetName;
		}
		var canvasPic = new Image();
		canvasPic.src = cPushArray[cStep].dataURL;
		canvasPic.onload = function() {
			// 이미지를 불러와서 대체시키고
			document.getElementById('draw').getContext('2d').drawImage(canvasPic, 0, 0);
			btnAble();
		};
		cStep++;
	}
	
	function cUndo() {
		cStep--;
		// 현재와 복원할 필터 및 프리셋 이름과 값을 저장해준다.
		var currentType = cPushArray[cStep].type.name;
		var currentName = cPushArray[cStep].type.filterName;
		var currentValue = cPushArray[cStep].type.filterValue;
		var currentPreset = cPushArray[cStep].type.presetName;
		
		var previousType = cPushArray[cStep-1].type.name;
		var previousName = cPushArray[cStep-1].type.filterName;
		var previousValue = cPushArray[cStep-1].type.filterValue;
		var previousPreset =  cPushArray[cStep-1].type.presetName;
		
		// 현재 상태에 대한 초기화가 필요하다.
		if(currentType == "filter") {
			filterList = {};
		}
		editReset();
		
		// 복원할 Array가 preset이라면
		if (previousType == "preset"){
			// 필터를 다 지우고
			filterList = {};
			// activePreset에 복원할 presetValue값을 넣어준다.
			activePreset = previousPreset;
	    // 복원할 Array가 필터라면
		}else if(previousType == "filter"){
			// type이 init이나 preset인 지점까지의 필터를 다 적용시켜야한다.
			
			// 이 부분은 init이나 Preset인 지점까지의 깊이를 알아낸다.
			var minusStep = 1;
			while(cPushArray[cStep-minusStep].type !="init" && cPushArray[cStep-minusStep].type.name !="preset") {
				minusStep++;
			}

			
			// cStep-minusStep은 init이나 preset을 찾은 위치이다. 거기에 +1을 더하면 init이나 preset의 바로 전이라고 생각하면 된다.
			// 거기서부터 현재 step의 전까지니까
			// preset이나 init이 아닌 중간 사이 지점을 말한다.
			// 그 사이에서 적용된 최종값들을 화면에 표시해준다.
			for(var i= cStep- minusStep +1; i<cStep; i++) {
				var dataFilter = "[data-filter=" + cPushArray[i].type.filterName + "]";
				$(dataFilter)[0].value = cPushArray[i].type.filterValue;
				$(dataFilter)[0].nextElementSibling.innerHTML = cPushArray[i].type.filterValue;
				filterList[cPushArray[i].type.filterName] = cPushArray[i].type.filterValue;
			}
		}
		// 이 작업을 해야하는 이유는 이 상태에서 save를 누르면 그 전에 적용된 내용도 적용이 되어야하기 때문이다.
		
		var canvasPic = new Image();
		canvasPic.src = cPushArray[cStep-1].dataURL;
		canvasPic.onload = function() {
			// 이미지를 불러와서 대체시키고
			document.getElementById('draw').getContext('2d').drawImage(canvasPic, 0, 0);
			btnAble();
		};
		
	}
	
	function btnAble(){
		var clearBtn = document.getElementById("clear");
		var undoBtn = document.getElementById("undo");
		var redoBtn = document.getElementById("redo");
		var textBtn = document.getElementById("text_drop");
		var saveCanvas = document.getElementById("saveCanvas");
		
		clearBtn.disabled = false;
        saveCanvas.disabled = false;
	    if ((cStep == 1 && cPushArray.length == 1) || cStep ==0 || cPushArray.length==0) {
    			clearBtn.disabled = true;
            undoBtn.disabled = true;
            redoBtn.disabled = true;
            saveCanvas.disabled = true;
            textBtn.disabled = false;
		}else if(cStep == cPushArray.length){
			undoBtn.disabled = false;
            redoBtn.disabled = true;
		}else if(cStep == 1 && cPushArray.length > cStep) {
//			clearBtn.disabled = true;
			undoBtn.disabled = true;
            redoBtn.disabled = false;
		}else if(cStep < cPushArray.length) {
			undoBtn.disabled = false;
            redoBtn.disabled = false;
		}
	}
	 
    function textRight(){
    	if(textWorking) {
			TextArray[selectFont].fontX = TextArray[selectFont].fontX + increaseX; 
			drawText(document.getElementById('draw'), document.getElementById('draw').getContext('2d'));
		}
    }
    
    function textLeft() {
		if(textWorking) {
			TextArray[selectFont].fontX = TextArray[selectFont].fontX-increaseX;
			drawText(document.getElementById('draw'), document.getElementById('draw').getContext('2d'));
		}
    }
    
    function textUp(){
		if(textWorking) {
			TextArray[selectFont].fontY = TextArray[selectFont].fontY-increaseY;
			drawText(document.getElementById('draw'), document.getElementById('draw').getContext('2d'));
		}
    }
    
    function textDown(){
		if(textWorking) {
			TextArray[selectFont].fontY = TextArray[selectFont].fontY+increaseY;
			drawText(document.getElementById('draw'), document.getElementById('draw').getContext('2d'));
		}
    }

	// 텍스트 값들 초기화
	function resetText(){
		textWorking = false;		// 오프닝 텍스트를 입력해서 작업중인지 여부
		textAdding = false;
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
		if(textAdding){
			if(!confirm("텍스트를 추가 하시면 더이상 수정하실 수 없습니다. 계속 추가하시겠습니까?")){
				return;
			}
		}
		comment = prompt("텍스트를 입력해주세요!");
		if(comment == null || comment.trim() == "" || comment == "") {
			return false;
		}
		
		TextArray.push({
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
	function drawText(drawCanvas, drawCtx, expandRatio){
		if(textWorking) {
			if(!expandRatio) {
				expandRatio = 1;
				drawCtx.putImageData(copyImage, 0 , 0);
			}
			for(var i =0; i < TextArray.length; i++){
				drawCtx.fillStyle = TextArray[i].fillStyle;
				var fontString = parseInt(TextArray[i].font * expandRatio)  + "px " +  TextArray[i].currentFont;
				drawCtx.font = fontString;
				drawCtx.fillText(TextArray[i].comment, TextArray[i].fontX * expandRatio, TextArray[i].fontY * expandRatio, drawCanvas.width);
			}
			document.getElementById("saveCanvas").removeAttribute("disabled");
			cPush(drawCanvas,"image/text");
		}
	}	
	
	//
//	// 텍스트 추가하는 함수
//	function addTextArray(){
//		comment = prompt("텍스트를 입력해주세요!");
//		TextArray.push({
//			comment : comment,
//			fillStyle : "#000000",
//			fontSize : "50",
//			fontX : fontX,
//			fontY : fontY
//		});
//		drawText(document.getElementById('draw'), document.getElementById('draw').getContext('2d'));
//	}
//	
//	// 텍스트 그리는 함수
//	function drawText(drawCanvas, drawCtx, expandRatio){
//		if(!expandRatio) {
//			expandRatio = 1;
//		}
//		for(var i =0; i < TextArray.length; i++){
//			drawCtx.fillStyle = TextArray[i].fillStyle;
//			drawCtx.font = TextArray[i].fontSize * expandRatio + "px " + currentFont;
//			drawCtx.fillText(TextArray[i].comment, TextArray[i].fontX * expandRatio, TextArray[i].fontY * expandRatio, drawCanvas.width);
//		}
//		document.getElementById("saveCanvas").removeAttribute("disabled");
//		cPush(drawCanvas,"image/text");
//	}
//	
//	function resetText(){
//		textWorking = false;		// 오프닝 텍스트를 입력해서 작업중인지 여부
//		textAdding = false;
//		fontX = 0;						// X 좌표
//		fontY = 50;					    // Y 좌표
//		comment;						// Comment
//		TextArray = [];
//	}
//	
	
	// view zone 시작
	var thumbNail = function() {}; 
	
	// preview 생성
	thumbNail.createElement = function(string) {
		var div;
		div = document.createElement("div");
		div.innerHTML = string;
		return div.childNodes[0];
	};
	
	// 넘겨받은 imgThumbArray(ajax로 넘어온값 정리한것)에서 값을 뺴내 태그와 썸네일을 생성해줌
	thumbNail.createFileElement = function(files) {
		var template, name, size, removeFile, thumbnail, message, blobReturn, imgNum;
		
		// 파일이 파일객체들의 파일리스트로 존재한다.
		for (var i = 0; f = files[i]; i++) {
			// preview Template을 생성
			template = document.createElement('li');
			template.innerHTML = "<div class=\"tv-preview tv-file-preview\">" +
													"<div class=\"tv-details\">" +
														"<div style=\"display:none\" class=\"tv-filename\">" +
															"<span data-tv-name></span>" +
														"</div>" +
													"<img data-tv-thumbnail />" +
													"</div>" +
													"<div style=\"display:none\" class=\"tv-num\">" +
													"<span data-tv-imgNum></span>" +
													"</div>" +
												"</div>";
			
			template.id = f.name;  // 이미지 이름넣기
			document.getElementById('thumbNail').appendChild(template);
			
			// 태그 선택해서 값 할당
			name = template.querySelector('[data-tv-name]');
			name.textContent = f.name;
			imgNum = template.querySelector('[data-tv-imgNum]');
			imgNum.textContent = f.imgNum;
			thumbnail = template.querySelector('[data-tv-thumbnail]');
			thumbnail.alt = f.name;
			thumbnail.src = atob(f.file);
		}
		$('.dropzone').bxSlider({
			  minSlides: 3,
			  maxSlides: 6,
			  slideWidth: 120,
			  slideMargin: 0
			});
	}
	
	
	
//////////////////////////////////////이벤트 리스너 ///////////////////////////////////////////
	
	
	// 썸네일 클릭시 해당파일 가져오기
	$(document).on('click', '[data-tv-thumbnail]',function(e) {
		// 현재 타겟의 src 저장위해 
		thumbnailSrc = e.target;
		// 이미지 넘버 페이지에서 가져오기
		var imgNum = e.target.parentElement.nextSibling.firstChild.innerHTML;
		var file=null;
		currentFile=null;
		for (var i=0; i<fileList.length; i++) {
			if(imgNum == fileList[i].imgNum){
				currentFile = fileList[i];
			}
		}
//		currentFile=file;
		
		$.ajax({
			type : "POST",
			url : "/fileDown",
			cache : false,
			data : {
				"dirName" : currentFile.dirName,
				"dirNum" : currentFile.dirNum,
				"imgName" : currentFile.imgName,
				"imgNum" : currentFile.imgNum,
				"imgFormat" : currentFile.imgFormat,
				"imgOriName" : currentFile.imgOriName,
				"m_id" : currentFile.m_id
			},
		success : onSuccess,
		error : onError
		});
		
		function onSuccess(data) {
			resetText();
			// 받아온 base64 데이터값으로 캔버스에 draw
			var canvas = document.getElementById('draw');
			var ctx = canvas.getContext('2d');
			document.getElementById("text_drop").removeAttribute("disabled");
			var image = new Image();
			image.src = data;
			image.onload = function() {
				ctx.clearRect(0, 0, canvas.width, canvas.height);
				// 먼저 사진이 canvas크기보다 큰지 확인한다.
				if (canvasMaxWidth < image.width || canvasMaxHeight < image.height) {
					if(canvasMaxWidth >= image.width) {
						ratio_width = image.width/canvasMaxWidth;
					}else if(canvasMaxWidth < image.width) {
						ratio_width = canvasMaxWidth/image.width;
					}
					if(canvasMaxHeight >= image.height) {
						ratio_height = image.height/canvasMaxHeight;
					}else if(canvasMaxHeight < image.height) {
						ratio_height = canvasMaxHeight/image.height;
					}
					
					ratio = ratio_width;
					if (ratio_width > ratio_height){
						ratio = ratio_height;
						exRatio = image.height / (image.height * ratio);
					}else if (ratio_width <= ratio_height){
						exRatio = image.width /  (image.width * ratio);
					}
				}else {
					ratio = 1;
					exRatio = 1;
				}
	
				console.log(exRatio);
				canvas.width =  image.width * ratio;
				canvas.height = image.height * ratio;
				ctx.drawImage(image, 0, 0, image.width, image.height, 0, 0, image.width * ratio, image.height * ratio);
				
		          // javascript는 참조복사이기 때문에 객체를 복사하기 위해서 copyCanvas를 생성한다.
                var copyCanvas = canvas;
                var copyCtx = copyCanvas.getContext('2d');
                // 텍스트 추가는 init에서 하고 init에서 복사한 이미지 copyCanvas가 실제로 보여진다.
                initWidth = copyCanvas.width;
                initHeight = copyCanvas.height;

                // 생성된 copyCanvas를 initCanvas로 putImageData를 이용하여 복사한다.
                initCanvas = document.createElement('canvas');
                initCtx = initCanvas.getContext('2d');
                initCanvas.id = canvas_name;
                initCanvas.width = initWidth;
                initCanvas.height = initHeight;
                initCtx.putImageData(copyCtx.getImageData(0, 0, initWidth, initHeight), 0, 0);
                // 원래 이미지를 copyImage에 저장한다.
                copyImage = initCtx.getImageData(0, 0, initWidth, initHeight);
                imageLoading = true;
                sourceImage = image;
                cPushArray.length = 0;
                cStep = 0;
                cPush(initCanvas);
			};
			
			// tools 및 array 및 filterList 초기화 해주기
			editReset();
			inputEnable();
			var saveCanvasDown = document.getElementById('saveCanvasDown');
			saveCanvasDown.classList.remove('disabled');
		}
		function onError(data) {
			alert("파일 받아오기 실패 다시 클릭해주세요");
		}
	});
	
	// BACK 버튼 
	$('#editBackBtn').on('click', function(e) {
		var m_id = $('#sessionID').val();
		document.getElementById('eidt_m_id').value=m_id;
		document.getElementById("editBack").submit();
	})

	
	// 이미지 저장 버튼
	$(document).on('click', '#saveCanvasDown', function(e) {
		var down = document.getElementById('saveCanvasDown');
		down.href = sourceImage.src;
		down.download = currentFile.imgOriName;
	});
	
	
	// 변경내용 저장 버튼
	$(document).on('click', '#saveCanvas', function(e) {
		
		if (!imageLoading) {
			return;
		}
		
		// sourceImage를 새로운 논리 Canvas로 불러와서 적용된 preset과 fileter을 적용한다.
		var sourceCanvas = document.createElement('canvas');
		var sourceCtx = sourceCanvas.getContext('2d');
		
		sourceCanvas.width = sourceImage.width;
		sourceCanvas.height = sourceImage.height;
		
		sourceCtx.drawImage(sourceImage, 0, 0, sourceImage.width, sourceImage.height);
		
		Caman(sourceCanvas, function() {
			if(activePreset != null){
				this[activePreset]();
			}
			if(Object.keys(filterList).length > 0) {
				var list = Object.keys(filterList);
				for(var i=0;i<list.length ;i++){
					this[list[i]](parseInt(filterList[list[i]]));
				}
			}
			this.render(function() {
				drawText(sourceCanvas, sourceCtx, exRatio);
				// 캔버스 이미지를 base64 형태로 받아옴
				var imgData = sourceCanvas.toDataURL("image/" + currentFile.imgFormat);
				// 썸네일을 만들어줄 canvas를 생성한다.
				var canvas = document.createElement('canvas');
				var ctx = canvas.getContext('2d');
				canvas.width = 100;
				canvas.height = 100;
				
				// 썸네일 만들 캔버스에 넘겨줄 원본파일 불러오기 위해서 image생성
				var img = new Image();
				img.onload = function() {
//						document.body.appendChild(img);
						// base64형태의 앞부분 제거
						imgData = imgData.replace(/^data:image\/(png|jpeg|gif|tiff);base64,/, "");
						// 캔버스로 이미지 그린다(원본 파일을 썸네일로 바꾸기 위해)
						ctx.drawImage(img, 0, 0, 100, 100);
						// 캔버스에 올려진 썸네일 이미지를 dataURL형태로 변환
						dataURL = canvas.toDataURL('image/*');
						// 변경된 썸네일을 파일리스트에 저장하기 위해서
						currentFile.imgThumb=dataURL;
						
						// 원본 이미지를 blob 형태로 저장하기 위한 배열 
						var sourceURL = [];
						sourceURL[0] = imgData;
						// Blob 안에는 파일과 배열만이 들어갈수 있다.
						var imgSource = new Blob(sourceURL, { 'type': 'image/' + currentFile.imgFormat });
						
						var filePath = [currentFile.m_id + "/" + currentFile.dirName + "/" + currentFile.imgName];
						var pathSource = new Blob(filePath, { 'type': 'text/*' });
							
						var formData = new FormData();
						formData.append("imgBase64", imgSource);
						formData.append("filePath", pathSource);
						
						$.ajax({
							type : "POST",
							url : "/fileUpdate",
							data : {
								"m_id" : currentFile.m_id,
								"dirName" : currentFile.dirName,
								"imgName" : currentFile.imgName,
								"imgOriName" : currentFile.imgOriName,
								"imgNum" : currentFile.imgNum,
								"imgFormat" : currentFile.imgFormat,
								"imgThumb" : dataURL
							},
							success : onSuccess,
							error : onError
						});
						
						/**
						 * 리턴값 정리
						 * return 1 : 파일시스템에 파일 저장하기 실패
						 * return 2 : DB에 저장실패 
						 * return 3 : DB에 저장하다 에러
						 * return 4 : 파일저장및 썸네일 DB 저장 완료
						 */
					
						function onSuccess(data) {
							if(data==4){
								var xhr = new XMLHttpRequest();
								var dzURL = "/imgFile";
								xhr.open("POST", dzURL, true);

								// 12.11 19:45 - Ajax응답
								xhr.onload = function(e) {
									var data;
									// 12.11 19:45 - 응답 완료 - 4
									if (xhr.readyState == 4) {
										data = xhr.response;
										if (data == 4){
											alert("파일을 정상적으로 저장했습니다.");
											thumbnailSrc.src = dataURL;
											sourceImage.src = sourceCanvas.toDataURL("image/" + currentFile.imgFormat);
											// 원본 파일 외에도 Slider는 썸네일을 미리 clone해놓기 때문에 clone된 썸네일도 바꿔줘야한다.
											// imgNum을 비교해서 같은 값인 clone썸네일의 값도 바꿔준다.
											var cloneThumbs = $('[data-tv-imgnum]');
											for (var i =0; i<cloneThumbs.length;i++){
												if(cloneThumbs[i].innerHTML == currentFile.imgNum){
													cloneThumbs[i].parentElement.parentElement.querySelector('img').src = dataURL;
												}
											}
										}
									}
								};

								xhr.onerror = function(e) {
									alert("Error : " + e.target.status);
								};
								xhr.send(formData);
							}
						}
						function onError(data) {
							alert("파일 저장 실패하였습니다");
						}
					};
					img.src= imgData; 
			});
		});
	});

	// 텍스트 추가 버튼 클릭 시
	$('#titleDialogBtn').on('click', function(e) {
		e.preventDefault();
		if(addTextArray()==true){
			if (!textAdding){
				textAdding = true;
				textWorking = true;
			}else{
				selectFont++;
			}
			fontY = TextArray[selectFont].fontY+ 50;
			drawText(document.getElementById('draw'), document.getElementById('draw').getContext('2d'));
		}
	
	});
	
	// 오른쪽 버튼 이벤트
	$('#titleDialogRight').on('mousedown', function(e) {
		e.preventDefault();
		dragEvent = setInterval(textRight, 100);
	}).on('click', function(e){
		e.preventDefault();
		textRight();
	}).on('mouseup', function(e) {
		e.preventDefault();
		clearInterval(dragEvent);
	}).on('mouseout', function(e) {
		e.preventDefault();
		clearInterval(dragEvent);
	});
	
	// 왼쪽 버튼 이벤트
	$('#titleDialogLeft').on('mousedown', function(e) {
		e.preventDefault();
		dragEvent = setInterval(textLeft, 100);
	}).on('click', function(e){
		e.preventDefault();
		textLeft();
	}).on('mouseup', function(e) {
		e.preventDefault();
		clearInterval(dragEvent);
	}).on('mouseout', function(e) {
		e.preventDefault();
		clearInterval(dragEvent);
	});
	
	// 위 버튼 이벤트
	$('#titleDialogUp').on('mousedown', function(e) {
		e.preventDefault();
		dragEvent = setInterval(textUp, 100);
	}).on('click', function(e){
		e.preventDefault();
		textUp();
	}).on('mouseup', function(e) {
		e.preventDefault();
		clearInterval(dragEvent);
	}).on('mouseout', function(e) {
		e.preventDefault();
		clearInterval(dragEvent);
	});
	
	// 아래 버튼 이벤트
	$('#titleDialogDown').on('mousedown', function(e) {
		e.preventDefault();
		dragEvent = setInterval(textDown, 100);
	}).on('click', function(e){
		e.preventDefault();
		textDown();
	}).on('mouseup', function(e) {
		e.preventDefault();
		clearInterval(dragEvent);
	}).on('mouseout', function(e) {
		e.preventDefault();
		clearInterval(dragEvent);
	});
	
	
	// 폰트 사이즈 선택할 때
	$('#textSize a').on('click', function(e) {
		e.preventDefault();
		console.log("textsize");
		if(textWorking){
			currentSize = e.currentTarget.dataset['text'];
			console.log("currentSize" + currentSize);
			document.getElementById('fontSize').innerHTML = e.currentTarget.innerHTML;
			TextArray[selectFont].font = currentSize;
			
			textUp();
			textDown();
		}
	});
	
	// 폰트 선택할 때
	$('#textFont a').on('click', function(e) {
		e.preventDefault();
		if(textWorking){
			console.log("text_changed");
			currentFont = e.currentTarget.dataset['text'];
			document.getElementById('fontTitle').innerHTML = e.currentTarget.innerHTML;
			TextArray[selectFont].currentFont = currentFont;
			
			textUp();
			textDown();
		}
	});
//	
//	$("#text").on("click", function(e){
//		e.preventDefault();
//		addTextArray();
//	});
//	
//	// 폰트 선택할 때
//	$('#textFont a').on('click', function(e) {
//		e.preventDefault();
//		if(textWorking){
//			console.log("text_changed");
//			currentFont = e.currentTarget.dataset['text'];
//			document.getElementById('fontTitle').innerHTML = e.currentTarget.innerHTML;
//			activeTextArray[selectFont].currentFont = currentFont;
//			
//			textUp();
//			textDown();
//		}
//	});
//	
//	// 폰트 사이즈 선택할 때
//	$('#textSize a').on('click', function(e) {
//		e.preventDefault();
//		console.log("textsize");
//		if(textWorking){
//			currentSize = e.currentTarget.dataset['text'];
//			console.log("currentSize" + currentSize);
//			document.getElementById('fontSize').innerHTML = e.currentTarget.innerHTML;
//			activeTextArray[selectFont].font = currentSize;
//			
//			textUp();
//			textDown();
//		}
//	});
	
	$("#clear").on("click", function() {
		
		var canvasPic = new Image();
		canvasPic.src = cPushArray[0].dataURL;
		canvasPic.onload = function() {
			// 이미지를 불러와서 대체시키고
			document.getElementById('draw').getContext('2d').drawImage(canvasPic, 0, 0);
			resetVariable();
		};
		cPushArray.length = 1;
	});
	
	$('#undo').on('click', function() {
		cUndo();
	});
	
	$('#redo').on('click', function() {
		cRedo();
	});
	
	// 이미지 차례지정하는 페이지(sortable)로 가기
	$('#sortable').click(function(){
		document.getElementById('hidden_m_id').value=fileList[0].m_id;
		document.getElementById('hidden_dirNum').value=fileList[0].dirNum;
		document.getElementById('hidden_dirName').value=fileList[0].dirName;
		document.getElementById("sortable").submit();
	}); 
})