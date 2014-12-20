
$(document).ready(function() {
	// edit창에서 쓰일 전역변수
	var fileList=[];
	
	// 현재 선택된 개체에 대한 FileVO의 정보저장
	var currentFile=null;
	
	// 현재 선택된 개체의 썸네일 주소저장위해
	var thumbnailSrc=null;

	// 캔버스 최대 크기 지정
	var canvasMaxWidth = 800;
	var canvasMaxHeight = 500;

    var drawzoneElement = document.getElementById("drawzone");
    var sourceImage;		// 화면에 보여주는 원본 이미지
    var initCanvas;     // 화면에 보여주는 Canvas의 원
    var initCtx;        // initCanvas의 context
    var initWidth;      // initCanvas Width
    var initHeight;     // initCanvas Height
    var copyImage;      // copy된 init의 getImageData값
	var ratio;					// 축소된 비율
    var canvas_name = 'draw';           // Canvas의 이름
    var filterList = {};        // Filter의 리스트를 담는 객체
    var filterSetting = document.getElementsByClassName("FilterSetting");
    var btnPresets = document.getElementById("PresetFilters").querySelectorAll("a");
    var activePreset = null		// 최종적으로 적용한 preset을 의미
    var imageLoading = false;
    
    // Filter에 이벤트 적용
    for (var i = 0; i < filterSetting.length; i++) {
        var inputBtn = filterSetting[i].querySelector("input");
        inputBtn.addEventListener("change", function (e) {
            // 현재 data-filter Attribute의 값 ("brightness")
            var filterName = e.target.attributes[5].value;
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
	            	console.log(e);
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
        	// filterList에 필터 값을 넣어준다. ("brightness : 66")
        		filterList[type.filterName] = type.filterValue;	
        }
        
        logicCtx.putImageData(copyImage, 0, 0);
        // 논리 canvas에 값을 적용한다.
        Caman(logicCanvas, function () {
            console.log("render Start");
            logicCanvas.id = canvas_name;
            if(type.name == "filter"){
            	var attrs = Object.keys(filterList);
                for (var i = 0; i < attrs.length; i++) {
                    if (parseInt(filterList[attrs[i]]) != 0) {
                        this[attrs[i]](parseInt(filterList[attrs[i]]));
                    }
                };	
            }else if (type.name=="preset") {
            		this[type.presetName]();
            }
            this.render();
            console.log("render End");
        });
        console.log("replace");
        
        // 렌더링하는 시간이 있기 때문에 replace를 지연해준다.
        var b = function () {
        	drawzoneElement.replaceChild(logicCanvas, document.getElementById(canvas_name));
	        	if(element) {
	        		element.innerHTML = type.text;
	        		activePreset = type.presetName;
	        	}
        };
        setTimeout(b, 800);
    }
	
	// 서버에서 파일 리스트 받아오기 위한 ajax
	$.ajax({
		type : "POST",
		url : "/imgLoad",
		cache : false,
		data : {
			
		},
		success : onSuccess,
		error : onError
	});
	function onSuccess(data) {
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
	
	
	function editReset() {
		
		// filterList 및 preset 초기화
		filterList = {};
		activePreset = null;
		
		// filterSetting 모든 range값 0으로 초기화
		for (var i = 0; i < filterSetting.length; i++) {
              var inputBtn = filterSetting[i].querySelector("input");
              	inputBtn.value = 0;
              	inputBtn.nextElementSibling.innerHTML = 0;
		}
	}
	
	// view zone 시작
	var thumbNail = function() {

	}; 
	
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
			template = thumbNail.createElement( 
					"<div class=\"tv-preview tv-file-preview\">\n  " +
						"<div class=\"tv-details\">\n    " +
							"<div style=\"display:none\" class=\"tv-filename\">" +
								"<span data-tv-name></span>" +
							"</div>\n    " +
						"<img data-tv-thumbnail />\n  " +
						"</div>\n  " +
						"<div style=\"display:none\" class=\"tv-num\">" +
						"<span data-tv-imgNum></span>" +
						"</div>\n    " +
					"</div><br/>"
					);
			
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
	}
	
	// 썸네일 클릭시 해당파일 가져오기
	$(document).on('click', '[data-tv-thumbnail]',function(e) {
		// 현재 타겟의 src 저장위해 
		thumbnailSrc = e.target;
		// 이미지 넘버 페이지에서 가져오기
		var imgNum = e.target.parentElement.nextSibling.nextSibling.firstChild.innerHTML;
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
			// 받아온 base64 데이터값으로 캔버스에 draw
			var canvas = document.getElementById('draw');
			var ctx = canvas.getContext('2d');
			var image = new Image();
			image.src = data;
			image.onload = function() {
				var ratio_width;
				var ratio_height;
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
					}
				}else {
					ratio = 1;
				}
				
				canvas.width =  image.width * ratio;
				canvas.height = image.height * ratio;
				ctx.drawImage(image, 0, 0, image.width, image.height, 0, 0, image.width * ratio, image.height * ratio);
				
		          // javascript는 참조복사이기 때문에 객체를 복사하기 위해서 copyCanvas를 생성한다.
                var copyCanvas = canvas;
                var copyCtx = copyCanvas.getContext('2d');
                initWidth = copyCanvas.width;
                initHeight = copyCanvas.height;

                console.log(initWidth);
                console.log(initHeight);
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
			};
			
			// tools 및 array 및 filterList 초기화 해주기
			editReset();
		}
		function onError(data) {
			alert("파일 받아오기 실패 다시 클릭해주세요");
		}
	});

	
	//TODO : 작업한 내용이 1개 이상 될 때 save버튼을 활성화 시켜주는 기능을 추가시켜준다. 0개면 다시 disable상태이다.(Undo Redo 기능에 넣으면 괜찮을 듯)
	
	$(document).on('click', '#saveCanvas', function(e) {
		
		if (!imageLoading) {
			return;
		}
		
		// sourceImage를 새로운 논리 Canvas로 불러와서 적용된 preset과 fileter을 적용한다.
		var sourceCanvas = document.createElement('canvas');
		var sourceCtx = sourceCanvas.getContext('2d');
		console.log("#saveCanvas");
		console.log(sourceImage.width);
		console.log(sourceImage.height);
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
					this[list[i]](filterList[list[i]]);
				}
			}
			this.render(function() {
				console.log("render end");
				
				// 캔버스 이미지를 base64 형태로 받아옴
				var imgData = sourceCanvas.toDataURL("image/png");
				
				// 썸네일을 만들어줄 canvas를 생성한다.
				var canvas = document.createElement('canvas');
				var ctx = canvas.getContext('2d');
				canvas.width = 100;
				canvas.height = 100;
				
				// 썸네일 만들 캔버스에 넘겨줄 원본파일 불러오기 위해서 image생성
				var img = new Image();
				img.onload = function() {
						document.body.appendChild(img);
						console.log("renderer");
						// base64형태의 앞부분 제거
						imgData = imgData.replace(/^data:image\/(png|jpeg);base64,/, "");
						// 캔버스로 이미지 그린다(원본 파일을 썸네일로 바꾸기 위해)
						ctx.drawImage(img, 0, 0, 100, 100);
						// 캔버스에 올려진 썸네일 이미지를 dataURL형태로 변환
						dataURL = canvas.toDataURL('image/*');
						// 변경된 썸네일을 파일리스트에 저장하기 위해서
						currentFile.imgThumb=dataURL;
						
						
						// 원본 이미지를 blob 형태로 저장하기 위한 배열 
						var sourceURL = [];
						sourceURL[0] = imgData;
						// Blob 안에는 파일과 배열만이 들어갈수 있다 
						var imgSource = new Blob(sourceURL, { 'type': 'image/png' });
						
						var formData = new FormData();
						formData.append("imgBase64", imgSource);
						
						$.ajax({
							type : "POST",
							url : "/fileUpdate",
							cache : false,
							data : {
								"m_id" : currentFile.m_id,
								"dirName" : currentFile.dirName,
								"imgName" : currentFile.imgName,
								"imgOrinName" : currentFile.imgOriName,
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
										if (status == 200) {
											data = xhr.response;
											if (data==4) { 
												alert("파일 저장 성공!");
											}
										} else {
											alert("받아오기실패");
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
	
	// 이미지 차례지정하는 페이지(sortable)로 가기
	$('#sortable').click(function(){
		document.getElementById('m_id').value=fileList[0].m_id;
		document.getElementById('dirNum').value=fileList[0].dirNum;
		document.getElementById('dirName').value=fileList[0].dirName;
		document.getElementById("sortable").submit();
	}); 
	
	
})