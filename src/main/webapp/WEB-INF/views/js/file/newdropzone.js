var output = [];  // 파일저장 배열
var outputBlob = [];  // 썸네일(blob) 저장 배열	
var hasFiles = 0;
var maxFiles = 9; // 최대 업로드 가능 파일 수
var files;
var bNum=0;
var thumbnailWidth = 100;
var thumbnailHeight = 100;
var method = "POST";
var dzURL;
var fieldsString = "<input type=\"file\" name=\"files []\" multiple=\"multiple\"/>";


// utility : elementbyId를 편하게 가져오기 위한 utility함수
	var get = function(id) {
		return document.getElementById(id);
	}
	
	
// Prototype
	// 12.11 19:45 - 배열 삭제 후 자동 당겨오기(index값 재설정)
	Array.prototype.remove = function(from, to) {
		var rest = this.slice((to || from) + 1 || this.length);
		this.length = from < 0 ? this.length + from : from;
		return this.push.apply(this, rest);
	};

	Array.prototype.fileSize = function(file) {
		return file.size;
	};
	
	
	/* console 디버깅을 편하게 하기 위한 함수 객체
	   사용법은 단순한 메시지를 보려면 메시지만 입력하면 되고
	   나중에 log 삭제 및 가독성을 위해 뒤에 함수명을 입력해주면 더욱 좋다.
	*/
	var Debugger = function() {
		
	};
	
	Debugger.log = function(message, funcName) {
		try {
			if (funcName) {
				console.log(funcName + " : " + message);
			} else {
				console.log(message);
			}
		} catch (exception) {
			return;
		}
	}

	// 메인 객체
	var dropzone = function() {

	}; 

	// 12.11 19:45 - preview 생성
	dropzone.createElement = function(string) {
		var div;
		div = document.createElement("div");
		div.innerHTML = string;
		return div.childNodes[0];
	};

	// 12.11 19:45 - File용량 보기 좋게 변경
	dropzone.filesize = function(size) {
		var string;
		// if (size >= 1024 * 1024 * 1024 * 1024 / 10) {
		// size = size / (1024 * 1024 * 1024 * 1024 / 10);
		// string = "TB";
		if (size >= 1000 * 1000 * 1000) {
			size = size / (1000 * 1000 * 1000 / 10);
			string = "GB";
		} else if (size >= 1000 * 1000) {
			size = size / (1000 * 1000 / 10);
			string = "MB";
		} else if (size >= 1000) {
			size = size / (1000 / 10);
			string = "KB";
		} else {
			size = size * 10;
			string = "byte";
		}
		return "<strong>" + (Math.round(size) / 10) + "</strong> " + string;
	};
	
	// 최대 업로드 수 제한 체크
	dropzone.canUpload = function(fileLength) {
		if (!fileLength) {
			fileLength = 0;
		}
		var sum = fileLength + hasFiles;
		Debugger.log(sum, "canUpload");

		// 지금 올린 파일과 기존의 파일의 합이 최대 업로드 가능한 파일 수와 같거나 넘는가?
		if (sum > maxFiles) {
			alert("업로드 최대 개수는 9개 입니다.");
			return false; // upload 가능한지 여부
		} else {
			hasFiles = hasFiles + fileLength;
			return true;
		}
	}

	// 12.11 19:45 - Dropzone 클릭시 발생하는 이벤트
	dropzone.fileClick = function(evt) {
		evt.stopPropagation();
		evt.preventDefault();
		
		// 12.11 19:45 - folder가 클릭되어있는지 여부를 확인
		var dirName = $('#drop_zone').data('folder');
		if(dirName){
			get('files').click();
		}
	}

	// 파일 리스트 생성 함수
	dropzone.createFileElement = function(files) {
		var template, name, size, removeFile, thumbnail, message, blobReturn, imgNum;
		// 서버에 저장된 파일 개수 카운팅
//		if()/
		
		if(Object.prototype.toString.call(files) != "[object FileList]") {
			// chrome 사용 했던 거
			// files.constructor.name != "FileList"	  
			hasFiles = hasFiles + files.length;
		}
		
		// 파일이 파일객체들의 파일리스트로 존재한다.
		for (var i = 0; f = files[i]; i++) {
			// preview Template을 생성
			template = dropzone.createElement(
			"<div class=\"dz-preview dz-file-preview\">\n  " +
				"<div class=\"dz-details\">\n    " +
					"<div class=\"dz-filename\">" +
						"<span data-dz-name></span>" +
					"</div>\n    " +
					"<div class=\"dz-size\" data-dz-size></div>\n    " +
					"<img data-dz-thumbnail />\n  " +
				"</div>\n  " +
				"<div class=\"dz-delete\">" +
					"<span data-dz-delete class='btn btn-default'>Delete</span>" +
				"</div>\n    " +
				"<div class=\"dz-state\">" +
					"<span data-dz-state>saved</span>" +
				"</div>\n" +
				"<div class=\"dz-num\">" +
					"<span data-dz-imgNum></span>" +
				"</div>\n    " +
			"</div>"
		);
			
			// 12.11 19:45 - preview를 클릭해도 dropzone 이벤트가 발생하지 않음
			template.addEventListener('mouseover', dropzone.handleMouseEnter);
			template.addEventListener('mouseout', dropzone.handleMouseleave);
			/////////
			
			template.id = f.name;
			get('drop_zone').appendChild(template);
			
			// 12.11 19:45 - 태그 선택해서 값 할당
			name = template.querySelector('[data-dz-name]');
			name.textContent = f.name;
			size = template.querySelector('[data-dz-size]');
			size.innerHTML = dropzone.filesize(f.size);
			imgNum = template.querySelector('[data-dz-imgNum]');
			imgNum.textContent = f.imgNum;
			removeFile = template.querySelector('[data-dz-delete]');
			removeFile.addEventListener('click', dropzone.removeFile, false);
			thumbnail = template.querySelector('[data-dz-thumbnail]');
			thumbnail.alt = f.name;
			//console.log( Object.prototype.toString.call(f));
			/////
			// 12.11 19:45 - 파일의 종류가 File일때만 output에 넣어준다.
			// 이것을 통해서 사용자가 직접 올린 파일만 output에 데이터를 담는다!
			// Object.prototype.toString.call(f) >> ie에서 File인지 알아보려고
			
			if (f.constructor.name == "File" || Object.prototype.toString.call(f) == "[object File]"){
				//console.log("11111");
				template.querySelector('[data-dz-state]').innerHTML ='upload';
				template.querySelector('[data-dz-state]').parentElement.style.backgroundPosition ="-40px 0px";
				output.push(f);
			}
			
			// 12.11 19:45 - 생성되는 preview에 썸네일을 추가 시켜준다.
			dropzone.createThumbnail(f, thumbnail, hasFiles - files.length + i); //
			
		}
	}
	
	// 12.11 19:45 - remove를 누르면 preview 및 files에 담겨있는 값을 삭제
	dropzone.removeFileElement = function(files, filename) {
		for (var i=0; files.length>=0; i++) {
			if (files[i]==filename) {
				document.getElementById(filename).remove;
				files.splice(i);
			}
			return ;
		}
	}

	// 12.11 19:45 - 썸네일 이미지를 생성하여 outputBlob에 저장하고 thumbnail src에 이미지 저장
	dropzone.createThumbnail = function(blobReturn, element, i) {
		// 썸네일의 크기를 지정
		var thumbnailWidth = 100;
		var thumbnailHeight = 100;
		// 받는 값이 파일 인경우 수행하고 그렇지 않고 blob형태이면 바로 element.src에 값 전달
		// 크롬에서만 확인되는 타입체크 console.log("blobReturn.constructor.name");
		//  blobReturn instanceof File  ---  IE와 크롬에서 동시에 타입체크
		if (blobReturn instanceof File) {
			var reader = new FileReader();
			// onloadend 안에서만이 img.src= reader.result; 이문장이 실행 되기때문에 
			// 코드가 좀 복잡해짐
			reader.onload = function(e) {
				// 썸네일을 만들어줄 canvas를 생성한다.
				var canvas = document.createElement('canvas');
				var ctx = canvas.getContext('2d');
				canvas.width = thumbnailWidth;
				canvas.height = thumbnailHeight;

				// 썸네일 만들 캔버스에 넘겨줄 원본파일 불러오기 위해서 image생성
				var img = new Image();
				img.src= reader.result; // img에 원본파일 blob 형태의 데이터 전달 

				// 캔버스로 이미지 그린다(원본 파일을 썸네일로 바꾸기 위해)
				ctx.drawImage(img, 0, 0, thumbnailWidth, thumbnailHeight);

				// 캔버스에 올려진 썸네일 이미지를 dataURL형태로 변환
				dataURL = canvas.toDataURL('image/*');
				// dataURL을 blob 형태로 저장하기 위한 배열 
				var ab = [];
				ab[0] = dataURL;
				// Blob 안에는 파일과 배열만이 들어갈수 있다 
				var bb = new Blob(ab, { 'type': 'image/png' });
				var blob = {
						"fileNum" : bNum,
						"data" : bb 
				}
				bNum++;
				bb.name = blobReturn.name;
				outputBlob.push(blob);    		// output에 blob 데이터 push
				element.src = dataURL;		// dropzone에 썸네일 집어넣기 위해서
			};
			reader.readAsDataURL(f);
		}else if(blobReturn instanceof Object){
			element.src = atob(blobReturn.file);
		}
//		element.src = blobReturn;
		
	}
	
	// Dropzone 클릭했을 때 처리
	dropzone.handleFileSelect = function(evt) {
		evt.stopPropagation();
		evt.preventDefault();
		files = evt.target.files; // FileList 객체
		
		// 이미지 파일인지 검사
		for(var i =0; i<files.length; i++ ){
			if(files[i].type.match("image/*") == null){
				alert("이미지 외에는 아무것도 올릴 수 없습니다.");
				return;
			}
		}
		
		// 파일 업로드가 가능한지 확인한다.
		if (!dropzone.canUpload(files.length)) {
			return;
		}

		dropzone.createFileElement(files);

	}

	// Drag&Drop 처리
	dropzone.handleDragSelect = function(evt) {
		evt.stopPropagation();
		evt.preventDefault();
		files = evt.dataTransfer.files; // FileList 객체

		// 이미지 파일인지 검사
		for(var i =0; i<files.length; i++ ){
			if(files[i].type.match("image/*") == null){
				alert("이미지 외에는 아무것도 올릴 수 없습니다.");
				return;
			}
		}
		
		// 파일 업로드가 가능한지 확인한다.
		if (!dropzone.canUpload(files.length)) {
			return;
		}

		dropzone.createFileElement(files);
	}

	
	dropzone.handleDragOver = function(evt) {
		evt.stopPropagation();
		evt.preventDefault();
		evt.dataTransfer.dropEffect = 'copy';
	}

	dropzone.fileUpload = function(evt) {
		dzURL = "/upload";
		var formData = new FormData();
	
		// 데이터 전송을 위해 XHR을 생성한다.
		var xhr = new XMLHttpRequest();
//		var xhr=null;
//		try {
//			xhr = new HMLHttpRequest();
//		} catch (trymicrosoft) {
//			try{
//				xhr = new ActiveXObject("Msxml2.XMLHTTP");
//			} catch(othermicrosoft) {
//				try {
//					xhr = new ActiveXObject("Microsoft.XMLHTTP");
//				} catch (failed) {
//					xhr = null;
//				}
//			}
//		}
//		if (xhr == null) {
//			alert("xhr null");
//		}
		var progress = document.querySelector('.percent');

		// 12.11 19:45 - 전송될 데이터가 존재하면
		if (output.length != 0){
			
			// 12.11 19:45 - 폼 데이터에 파일 저장 
			$.each(output, function(i, file) {
				formData.append('file-' + i, file);
			});
			outputBlob.sort(function(a,b){return a.fileNum-b.fileNum});
			
			for(var i=0; outputBlob.length>i; i++) {
				outputBlob[0].fileNum=i;
			}
			// 12.11 19:45 - 폼 데이터 썸네일 저장
			$.each(outputBlob, function(i, blob) {
				formData.append("blob-" + i, blob.data);
			});
//			console.log(outputBlob);
			// 12.11 19:45 - XHR 
			xhr.open(method, dzURL, true);
			xhr.responseType = 'json';
	
			xhr.upload.onloadstart = function(e) {
				document.getElementById('progress_bar').className = 'loading';
				progress.style.width = '0%';
				progress.textContent = '0%';
			};
	
			// 12.11 19:45 - 프로그래스바
			xhr.upload.onprogress = function(e) {
						var percentLoaded = Math.round((e.loaded / e.total) * 100);
						progress.style.width = percentLoaded + '%';
						progress.textContent = percentLoaded + '%';
			};
	
			// 12.11 19:45 - Ajax응답
			xhr.onload = function(e) {
				var data;
				// 12.11 19:45 - 응답 완료 - 4
				if (xhr.readyState == 4) {
					progress.style.width = '100%';
					progress.textContent = '100%';
					document.getElementById('progress_bar').className = '';
					data = xhr.response;
					// 열우 2014. 12. 13 (12:33) 
					// data는 현재 업로드된 data의 개수만 가져오기 때문에 기존 업로드 된 숫자와는 관련이 없다.
					// 그렇기 때문에 지금 data-dz-imgnum의 innerHTML이 존재하지 않는 개수와 동일하다.
					// 그래서 data-dz-imgnum이 비어있는 span을 찾아서 그에 맞는 값을 넣어주면 된다.
					// 이것은 둘다 순서대로 만들어지고 순서대로 data값이 들어온다는 전제하에 작동된다. 
					// 우리는 그렇게 되어있어서 에러가 안난다.

					console.log(hasBrowser());
					// 브라우저 체크
					if (hasBrowser() == "IE") {
						data = JSON.parse(data);
						console.log("data IE parser 들어옴");
					}
//					console.log(document.getElementById("drop_zone").querySelectorAll('[data-dz-imgnum]'));
					for(var i=0;i < data.length; i++){
						var imgNumList = document.getElementById("drop_zone").querySelectorAll('[data-dz-imgnum]');
						for(var j=0; j<imgNumList.length;j++){
							if(imgNumList[j].innerHTML=="undefined" || !(imgNumList[j].innerHTML)){
								imgNumList[j].innerHTML = data[i].imgNum;
								break;
							}
						}
					}
					
					// 12.11 19:45 - 업로드 후 상태 태그 값 Saved로 변경
					var stateList = document.getElementById("drop_zone").querySelectorAll('[data-dz-state]');
					for (var i=0; i<stateList.length; i++) {
						stateList[i].innerHTML = 'saved';
						stateList[i].parentElement.style.backgroundPosition = '0px 0px';
					}
					
					// 12.11 19:45 - 업로드 후 데이터 초기화
					output = [];
					outputBlob = [];
					bNum=0;
					// input 태그에 files를 초기화 하기 위해서
					var input = $('#files');
					var newInput = input.clone(true); // true 는 속성까지 복사해 옴
					input[0].files = newInput[0].files;
					///////
				} else {
					alert("세션이 종료되었거나 파일 올리기가 실패 하였습니다\n 처음페이지로 돌아갑니다.");
					window.location.href="/";
				}
			};
	
			xhr.onerror = function(e) {
				alert("Error : " + e.target.status);
			};
			xhr.send(formData);
		}
	}

	dropzone.handleMouseEnter = function(e) {
		e.stopPropagation();
		e.preventDefault();
		get('files').setAttribute('disabled', 'disabled');
	}

	dropzone.handleMouseleave = function(e) {
		e.stopPropagation();
		e.preventDefault();
		get('files').removeAttribute('disabled');
	}
	
	// 드랍존에서 파일 삭제 하기 위한 곳
	dropzone.removeFile = function(e) {
		// 12.11 19:45 - dropzone안에 생성되어있는 preview안에 있는 state 태그의 값
		
		var stateValue = e.target.parentElement.nextElementSibling.childNodes[0].innerHTML;	
		var id = $('#m_id').val();
		var dirName = $('#drop_zone').data('folder');
		
		// 12.11 19:45 - dropzone안에 생성되어있는 preview안에 태그의 id		
		var imgName = e.target.parentElement.parentElement.id;
		// 12.11 19:45 - dropzone안에 생성되어있는 preview안에 있는 imgNum 태그의 값
		var imgNum = e.target.parentElement.nextElementSibling.nextElementSibling.childNodes[0].innerHTML;
			
		if (stateValue == 'saved') {  // 서버에 저장된 파일
			$.ajax({
				type : "POST",
				url : "/removeFile",
				data : {
					"m_id" : id,
					"dirName" : dirName,
					"imgName" : imgName,
					"imgNum" : imgNum
				},
				success : onSuccess,
				error : onError
			});
			
			/**
			 * 반환값 정리
			 * deleteFileSuccess : DB, FileSystem 동시에 삭제 성공
			 * deleteFileDBFail : DB 에서의 File 삭제 실패
			 * deleteFileFail : DB는 삭제 했으나 FileSystem 존재
			 * deleteFileEx : Exception 발생하고 삭제 실패
			 */
			function onSuccess(data) {
				if(data=="deleteFileSuccess"){
					//alert("삭제하였습니다.");

				}else if(data=="deleteFileDBFail"){
					alert("실패 : DB 에서의 File 삭제 실패");
				}else if(data=="deleteFileFail") {
					alert("실패 : DB는 삭제 했으나 FileSystem 존재");
				}else if(data=="deleteFileEx") {
					alert("실패 : Exception 발생하고 삭제 실패");
				}else if(data="SessionNullEx") {
					alert("세션이 만료되었습니다.");
					window.location.href="/";
				}
			
				if(hasBrowser() == "IE") {
					var temp = e.target.parentElement.parentElement;
					while(temp.hasChildNodes()) {
						temp.removeChild(temp.firstChild);
					}
					temp.removeNode();
				}else {
					// 12.11 19:45 - preview 통채로 날리기
					e.target.parentElement.parentElement.remove();
				}
				hasFiles = hasFiles - 1;
			}
			function onError(data, status) {
				alert("삭제실패");
			}
		}else if (stateValue == 'upload') {  // 사용자가 새로 올린파일
			
			// 해당 파일 삭제
			var sliceIndex;
			for(var i=0; output.length>i; i++) {
				if (output[i].name == imgName) {
					sliceIndex = i;
					break;
				}
			}
			output.remove(sliceIndex);
			
			// 해당 썸네일 삭제
			for(var i=0; outputBlob.length>i; i++) {
				if (outputBlob[i].name == imgName) {
					sliceIndex = i;
					break;
				}
			}
			outputBlob.remove(sliceIndex);
			
			
			if(hasBrowser() == "IE") {
				var temp = e.target.parentElement.parentElement;
				while(temp.hasChildNodes()) {
					temp.removeChild(temp.firstChild);
				}
				temp.removeNode();
			}else {
				// 12.11 19:45 - preview 통채로 날리기
				e.target.parentElement.parentElement.remove();
			}
			hasFiles = hasFiles - 1;
			
			// input 태그에 files를 초기화 하기 위해서
			var input = $('#files');
			var newInput = input.clone(true); // true 는 속성까지 복사해 옴
			input[0].files = newInput[0].files;
		}
	}
	
	// 12.11 19:45 - 폴더 클릭이나 드랍존 새로 불러올 때 초기화 
	dropzone.resetDropzone = function(e) {
		var temp = document.getElementById('drop_zone');
		while(temp.hasChildNodes()) {
			temp.removeChild(temp.firstChild);
		}
		$('#drop_zone').removeData('folder');
	}

