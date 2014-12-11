/**
 * created by Sung Yeol Woo. (2014. 11. 26)
 */

	// elementbyId를 편하게 가져오기 위한 util함수
	var get = function(id) {
		return document.getElementById(id);
	}
	
	// 배열삭제후 
	Array.prototype.remove = function(from, to) {
		var rest = this.slice((to || from) + 1 || this.length);
		this.length = from < 0 ? this.length + from : from;
		return this.push.apply(this, rest);
	};

	Array.prototype.fileSize = function(file) {
		return file.size;
	};

	var output = [];  // 파일저장 배열
	var outputBlob = [];  // 썸네일(blob) 저장 배열
	var maxFiles = 100; // 최대 업로드 가능 파일 수
	var files;
	var thumbnailWidth = 100;
	var thumbnailHeight = 100;
	var method = "POST";
	var dzURL;
	var fieldsString = "<input type=\"file\" name=\"files []\" multiple=\"multiple\"/>";

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

	/* createElement를 만들면 id값이나 class값을 따로 넣어줘야한다.
	   하지만 이 함수를 통해서 childNodes[0]의 값을 리턴하면
	   innerHTML로 만든 문장으로 엘리먼트를 생성할 수 있다.
	   밑에 보면 div = <div></div>가 생성 되고 
	   div.innerHTML = "<div class='asd' id='asd'></div>" 를 입력하면
	   <div>
			<div class='asd' id='asd'>
				<div class="asdsadasdad" id="asdasdsad">
				</div>
			</div>
	   </div>
	   이 형태로 만들어지는데 여기서 return으로 div.childNodes[0] 을 해주면
	   <div class='asd' id='asd'></div> 값만 리턴되기 때문에 
	   안에 있는 엘리먼트만 가져오는 기능을 갖게 된다. 
	 */
	dropzone.createElement = function(string) {
		var div;
		div = document.createElement("div");
		div.innerHTML = string;
		return div.childNodes[0];
	};

	/*
	 * filesize를 용량에 맞게 바꿔준다.
	 */
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
	// 최대 업로드 제한 체크
	dropzone.canUpload = function(fileLength) {
		if (!fileLength) {
			fileLength = 0;
		}
		var sum = fileLength + output.length;
		Debugger.log(sum, "canUpload");

		// 지금 올린 파일과 기존의 파일의 합이 최대 업로드 가능한 파일 수와 같거나 넘는가?
		if (sum > maxFiles) {
			alert("업로드 최대 개수는 9개 입니다.");
			return false; // upload 가능한지 여부
		} else {
			return true;
		}
	}

	// dropzone을 클릭하면 input type="file" 화면이 나타난다.
	dropzone.fileClick = function(evt) {
		evt.stopPropagation();
		evt.preventDefault();
		get('files').click();
	}

	// 파일 리스트 생성 함수
	dropzone.createFileElement = function(files) {
		var template, name, size, removeFile, thumbnail, message, blobReturn;

		// 메인에 뜨는 dropzone 그림 사라지게 하기
		message = get('drop_zone').querySelector('.dz-message');
		if(message){
			message.classList.remove("dz-default");
			message.classList.add("dz-started");
		}
		// 파일이 파일객체들의 파일리스트로 존재한다.
		for (var i = 0; f = files[i]; i++) {
			// preview Template을 생성(개별 존재)
			template = dropzone.createElement( 
					"<div class=\"dz-preview dz-file-preview\">\n  " +
						"<div class=\"dz-details\">\n    " +
							"<div class=\"dz-filename\">" +
								"<span data-dz-name></span>" +
							"</div>\n    " +
							"<div class=\"dz-size\" data-dz-size></div>\n    " +
							"<img data-dz-thumbnail />\n  " +
						"</div>\n  " +
						"<div class=\"dz-progress\">" +
							"<span class=\"dz-upload\" data-dz-uploadprogress></span>" +
						"</div>\n  " +
						"<div class=\"dz-delete\">" +
							"<span data-dz-delete>delete</span>" +
						"</div>\n    " +
						"<div class=\"dz-state\">" +
							"<span data-dz-state>saved</span>" +
						"</div>\n" +
					"</div>"
					);
			// 생성된 엘리먼트를 클릭해도 파일 업로드 창이 뜨지 않는다.
			template.addEventListener('mouseover', dropzone.handleMouseEnter);
			template.addEventListener('mouseout', dropzone.handleMouseleave);
			template.id = f.name;
			get('drop_zone').appendChild(template);
			name = template.querySelector('[data-dz-name]');
			name.textContent = f.name;
			size = template.querySelector('[data-dz-size]');
			size.innerHTML = dropzone.filesize(f.size);
			
			removeFile = template.querySelector('[data-dz-delete]');
			removeFile.addEventListener('click', dropzone.removeFile, false);
			
			
			// output에 파일 push
			if (f.constructor.name == "File" ){
				template.querySelector('[data-dz-state]').innerHTML ='upload';
				
				output.push(f);
			}
			// 썸네일 div 셀렉트
			thumbnail = template.querySelector('[data-dz-thumbnail]');
			thumbnail.alt = f.name;
			// 선택한 썸네일 div div 안에 썸네일 이미지 생성 
			dropzone.createThumbnail(f, thumbnail); //
				
			
			/**
			 * 이부분은 createThumbnail 안에서 구현 
			 * 파일 불러와서 blob으로 데이터 output에 저장
			var reader = new FileReader();
			reader.onloadend = function() {
				console.log(reader.result);
				var ab = [];
				ab[0] = reader.result;
				var bb = new Blob(ab);
				console.log(bb);
				output.push(bb);
				console.log(output);
			};
			reader.readAsDataURL(f);*/
			
//			이 부분은 나중에 클래스를 동적으로 변경시키기 해서 필요한 소스(CSS할때 중요)
//			template.classList.remove("dz-file-preview");
//			template.classList.add("dz-image-preview");
		}
	}
	
	// 파일 이름으로 태그및 파일리스트에서 해당 파일 삭제
	dropzone.removeFileElement = function(files, filename) {
		for (var i=0; files.length>=0; i++) {
			if (files[i]==filename) {
				document.getElementById(filename).remove;
				files.splice(i);
			}
			return ;
		}
	}
			
//			var output = document.createElement('div');
			
//			output.innerHTML = [ '<strong>', f.name, '</strong> (', f.type,
//					') - ', f.size, 'bytes, last modified : ',
//					f.lastModifiedDate.toLocaleDateString(),
//					'<span id="dz-delete">삭제</span>' ].join('');
//			dropzone.createThumbnail(f, output);
//		get('drop_zone').insertBefore(output, null);

	// 썸네일 이미지 생성 하고 썸네일 Blob 데이터를 output에 push
	dropzone.createThumbnail = function(blobReturn, element) {
		// 이미지 인가 검사
//		if (!f.type.match('image*')) {
//			return;
//		}
		// 썸네일의 크기를 지정
		var thumbnailWidth = 100;
		var thumbnailHeight = 100;
		// 받는 값이 파일 인경우 수행하고 그렇지 않고 blob형태이면 바로 element.src에 값 전달 
		if (blobReturn.constructor.name == 'File') {
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
				bb.name = blobReturn.name;
				outputBlob.push(bb);    		// output에 blob 데이터 push
				element.src = dataURL;		// dropzone에 썸네일 집어넣기 위해서
			};
			reader.readAsDataURL(f);
		}else if(blobReturn.constructor.name == 'Object'){
			element.src = atob(blobReturn.file);
		}
//		element.src = blobReturn;
		
	}
	// 파일을 클릭했을 때 저장할 함수
	dropzone.handleFileSelect = function(evt) {
		evt.stopPropagation();
		evt.preventDefault();
		files = evt.target.files; // FileList 객체
		
		// 파일 업로드가 가능한지 확인한다.
		if (!dropzone.canUpload(files.length)) {
			return false;
		}

		dropzone.createFileElement(files);

	}

	dropzone.handleDragSelect = function(evt) {
		evt.stopPropagation();
		evt.preventDefault();
		var files = evt.dataTransfer.files; // FileList 객체

		// 파일 업로드가 가능한지 확인한다.
		if (!dropzone.canUpload(files.length)) {
			return false;
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
		var progress = document.querySelector('.percent');
		//var fileSizes = [];
		$.each(output, function(i, file) {
			formData.append('file-' + i, file);
			console.log(output);
		});
		console.log(outputBlob);
		$.each(outputBlob, function(i, blob) {
			formData.append('blob-' + i, blob)
			console.log(outputBlob);
		});
		console.log(formData);
		// XHR은 url을 open하고 요청을 보내면 된다. 맨 뒤에 true는 비동기방식으로 할 것인지 묻는 것이다.
		xhr.open(method, dzURL, true);

		xhr.upload.onloadstart = function(e) {
			document.getElementById('progress_bar').className = 'loading';
			progress.style.width = '0%';
			progress.textContent = '0%';
		};

		xhr.upload.onprogress = function(e) {
					var percentLoaded = Math.round((e.loaded / e.total) * 100);
					progress.style.width = percentLoaded + '%';
					progress.textContent = percentLoaded + '% ' + '(' + 1 + '/'
							+ 5 + ')';
					//console.log(e.loaded);
				// Debugger.log(e);
				// Debugger.log(e.totalSize, "totalSize : ");
				// Debugger.log(e.position, "position : ");
				// Debugger.log("-------------------");
				// var percentComplete = (e.position / e.totalSize)*100;

				//
				// if (percentLoaded < 100) {
				// progress.style.width = percentLoaded + '%';
				// progress.textContent = percentLoaded + '% ' + '(' + i + '/' +
				// sum + ')';
				// }
		};

		xhr.onload = function(e) {
			if (xhr.readyState == 4) {
				progress.style.width = '100%';
				progress.textContent = '100%';
				document.getElementById('progress_bar').className = '';
			}
		};

		xhr.onerror = function(e) {
			alert("Error : " + e.target.status);
		};
		xhr.send(formData);
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
//		e.target.parentElement.parentElement.remove();
		var stateValue = e.target.parentElement.nextSibling.nextElementSibling.childNodes[0].innerHTML;
		var id = m_id.value;
		var dirName = $('#drop_zone').data('folder');
		var imgName = e.target.parentElement.parentElement.id;
		console.log(imgName);
		if (stateValue == 'saved') {  // 서버에 파일
			console.log("Saved안으로 들어옴");
			$.ajax({
				type : "POST",
				url : "/removeFile",
				cache : false,
				data : {
					"m_id" : id,
					"dirName" : dirName,
					"imgName" : imgName
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
					alert("삭제하였습니다.");
					e.target.parentElement.parentElement.remove();
				}else if(data=="deleteFileDBFail"){
					alert("실패 : DB 에서의 File 삭제 실패");
				}else if(data=="deleteFileFail") {
					alert("실패 : DB는 삭제 했으나 FileSystem 존재");
					// 유에서 날라가서 불러올수 없으니 삭제처리된걸로 간주 
					e.target.parentElement.parentElement.remove();
				}else if(data=="deleteFileEx") {
					alert("실패 : Exception 발생하고 삭제 실패");
				}
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
			e.target.parentElement.parentElement.remove();
		}
	}
	
	dropzone.resetDropzone = function(e) {
		var temp = document.getElementById('drop_zone');
		while(temp.hasChildNodes()) {
			temp.removeChild(temp.firstChild);
		}
	}

$(document).ready(function() {
	// EventListener 등록
	
	get('drop_zone').addEventListener('dragover', dropzone.handleDragOver,false);
	get('drop_zone').addEventListener('drop', dropzone.handleDragSelect, false);
	get('drop_zone').addEventListener('click', dropzone.fileClick, false);
	get('files').addEventListener('change', dropzone.handleFileSelect, false);
	get('drop_zone').addEventListener('mouseover', dropzone.handleMouseleave, false);
	get('upload_dropzone').addEventListener('click', dropzone.fileUpload, false);
	
});
