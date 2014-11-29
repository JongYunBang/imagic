/**
 * created by Sung Yeol Woo. (2014. 11. 26)
 */
$(function() {

	// 메인 객체
	var dropzone = dropzone || {};
	var output = [];
	var maxFiles = 9; // 최대 업로드 가능 파일 수
	var files;
	var thumbnailWidth = 100;
	var thumbnailHeight = 100;
	var method = "POST";
	var url;
	
	var previewTemplate = "<div class=\"dz-preview dz-file-preview\">\n  <div class=\"dz-details\">\n    <div class=\"dz-filename\"><span data-dz-name></span></div>\n    <div class=\"dz-size\" data-dz-size></div>\n    <img data-dz-thumbnail />\n  </div>\n  <div class=\"dz-progress\"><span class=\"dz-upload\" data-dz-uploadprogress></span></div>\n  <div class=\"dz-success-mark\"><span>✔</span></div>\n  <div class=\"dz-error-mark\"><span>✘</span></div>\n  <div class=\"dz-error-message\"><span data-dz-errormessage></span></div>\n</div>";
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
	// elementbyId를 편하게 가져오기 위한 util함수
	var get = function(id) {
		return document.getElementById(id);
	}

	/* createElement를 만들면 id값이나 class값을 따로 넣어줘야한다.
	   하지만 이 함수를 통해서 childNodes[0]의 값을 리턴하면
	   innerHTML로 만든 문장으로 엘리먼트를 생성할 수 있다.
	   밑에 보면 div = <div></div>가 생성 되고 
	   div.innerHTML = "<div class='asd' id='asd'></div>" 를 입력하면
	   <div>
			<div class='asd' id='asd'></div>
	   </div>
	   이 형태로 만들어지는데 여기서 return으로 div.childNodes[0] 을 해주면
	   <div class='asd' id='asd'></div> 값만 리턴되기 때문에 
	   안에 있는 엘리먼트만 가져오는 기능을 갖게 된다. 
	 */
	dropzone.createElement = function (string) {
        var div;
        div = document.createElement("div");
        div.innerHTML = string;
        return div.childNodes[0];
    };

    /* 
     *  filesize를 용량에 맞게 바꿔준다.
     */
    dropzone.filesize = function (size) {
        var string;
//        if (size >= 1024 * 1024 * 1024 * 1024 / 10) {
//            size = size / (1024 * 1024 * 1024 * 1024 / 10);
//            string = "TB";
        if (size >= 1000 * 1000 * 1000) {
            size = size / (1000 * 1000 * 1000 / 10);
            string = "GB";
        }else if (size >= 1000* 1000) {
            size = size / (1000 * 1000 / 10);
            string = "MB";
        } else if (size >= 1000) {
            size = size / (1000 / 10);
            string = "KB";
        } else {
            size = size * 10;
            string = "byte";
        }
        return "<strong>" + (Math.round(size)/10) + "</strong> " + string;
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
		get('files').click();
	}

	// 파일 리스트 생성 함수
	dropzone.createFileElement = function(files) {
		var template, name, size, thumbnail, message; 
		
		// 메인에 뜨는 dropzone 그림 사라지게 하기
		message = get('drop_zone').querySelector('.dz-message');
		message.classList.remove("dz-default");
		message.classList.add("dz-started");

		//파일이 파일객체들의 파일리스트로 존재한다.
		for (var i = 0; f = files[i]; i++) {
			// preview Template을 생성(개별 존재)
			template = dropzone.createElement(previewTemplate);
			get('drop_zone').appendChild(template);
			name = template.querySelector('[data-dz-name]');
			name.textContent = f.name;
			size = template.querySelector('[data-dz-size]');
			size.innerHTML = dropzone.filesize(f.size);
			thumbnail = template.querySelector('[data-dz-thumbnail]');
			thumbnail.alt = f.name;
			dropzone.createThumbnail(f, thumbnail);
			
//			이 부분은 나중에 클래스를 동적으로 변경시키기 해서 필요한 소스(CSS할때 중요)
//			template.classList.remove("dz-file-preview");
//			template.classList.add("dz-image-preview");
		}
	}
			
//			var output = document.createElement('div');
			
//			output.innerHTML = [ '<strong>', f.name, '</strong> (', f.type,
//					') - ', f.size, 'bytes, last modified : ',
//					f.lastModifiedDate.toLocaleDateString(),
//					'<span id="dz-delete">삭제</span>' ].join('');
//			dropzone.createThumbnail(f, output);
//		get('drop_zone').insertBefore(output, null);

	dropzone.createThumbnail = function(f, element) {
		if (!f.type.match('image*')) {
			return;
		}

		var reader = new FileReader();

		reader.onload = function(e) {
			element.src = reader.result;
		};
		reader.readAsDataURL(f);
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
		url = "/upload";
		Debugger.log("fileUpload 접속");

		var formData = new FormData();
		$.each(files, function(i, file) {
			formData.append('file-' + i, file);
			Debugger.log(files);
			Debugger.log(file);
		});
		// 데이터 전송을 위해 XHR을 생성한다.
		var xhr = new XMLHttpRequest();

		var progress = document.querySelector('.percent');

		// XHR은 url을 open하고 요청을 보내면 된다. 맨 뒤에 true는 비동기방식으로 할 것인지 묻는 것이다.
		xhr.open(method, url, true);

		xhr.upload.onloadstart = function(e) {
			document.getElementById('progress_bar').className = 'loading';
			progress.style.width = '0%';
			progress.textContent = '0%';
		};

		xhr.upload.onprogress = function(e) {
			if (e.lengthComputable) {
				// Debugger.log(e);
				// Debugger.log(e.totalSize, "totalSize : ");
				// Debugger.log(e.position, "position : ");
				// Debugger.log("-------------------");
				// var percentComplete = (e.position / e.totalSize)*100;
				var percentLoaded = Math.round((e.loaded / e.total) * 100);

				if (percentLoaded < 100) {
					progress.style.width = percentLoaded + '%';
					progress.textContent = percentLoaded + '%';
				}
			}
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

	// EventListener 등록
	get('drop_zone').addEventListener('dragover', dropzone.handleDragOver,
			false);
	get('drop_zone').addEventListener('drop', dropzone.handleDragSelect, false);
	get('drop_zone').addEventListener('click', dropzone.fileClick, false);
	get('files').addEventListener('change', dropzone.handleFileSelect, false);
	get('upload_dropzone')
			.addEventListener('click', dropzone.fileUpload, false);
})
