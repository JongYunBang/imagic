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

	dropzone.createThumbnails = function(file) {
		var fileWidth = file.width;
		var fileHeight = file.height;

		Debugger.log(fileWidth, "fileWidth");
		Debugger.log(fileHeight, "fileHeight");
	}
	// console 디버깅을 편하게 하기 위한 함수 객체
	// 사용법은 단순한 메시지를 보려면 메시지만 입력하면 되고
	// 나중에 log 삭제 및 가독성을 위해 뒤에 함수명을 입력해주면 더욱 좋다.
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

	// 파일을 클릭했을 때 저장할 함수
	dropzone.handleFileSelect = function(evt) {

		evt.stopPropagation();
		evt.preventDefault();
		files = evt.target.files; // FileList 객체

		// 파일 업로드가 가능한지 확인한다.
		if (!dropzone.canUpload(files.length)) {
			return false;
		}

		// 파일이 파일객체들의 파일리스트로 존재한다.
		for (var i = 0; f = files[i]; i++) {

			output.push('<li><strong>' + f.name + '</strong> (' + f.type
					+ ') - ' + f.size + 'bytes, last modified : '
					+ f.lastModifiedDate.toLocaleDateString() + '</li>');
			Debugger.log("handleFileSelect");

		}

		get('drop_zone').innerHTML = '<ul>' + output.join(' ') + '</ul>';
	}

	dropzone.handleDragSelect = function(evt) {
		evt.stopPropagation();
		evt.preventDefault();
		var files = evt.dataTransfer.files; // FileList 객체

		// 파일 업로드가 가능한지 확인한다.
		if (!dropzone.canUpload(files.length)) {
			return false;
		}

		// 파일이 파일객체들의 파일리스트로 존재한다.
		for (var i = 0, f; f = files[i]; i++) {
			output.push('<li><strong>' + f.name + '</strong> (' + f.type
					+ ') - ' + f.size + 'bytes, last modified : '
					+ f.lastModifiedDate.toLocaleDateString() + '</li>');
			Debugger.log(files[i], "handleDragSelect");
		}
		get('drop_zone').innerHTML = '<ul>' + output.join(' ') + '</ul>';
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
		});
		// 데이터 전송을 위해 XHR을 생성한다.
		var xhr = new XMLHttpRequest();

		var progress = document.querySelector('.percent');

		// XHR은 url을 open하고 요청을 보내면 된다. 맨 뒤에 true는 비동기방식으로 할 것인지 묻는 것이다.
		xhr.open(method, url, true);
		Debugger.log("xhr open");

		xhr.upload.onloadstart = function(e) {
			document.getElementById('progress_bar').className = 'loading';
			progress.style.width = '0%';
			progress.textContent = '0%';
		};

		xhr.upload.onprogress = function(e) {
			if (e.lengthComputable) {
				Debugger.log(e);
				Debugger.log(e.totalSize, "totalSize : ");
				Debugger.log(e.position, "position : ");
				Debugger.log("-------------------");
				// var percentComplete = (e.position / e.totalSize)*100;
				var percentLoaded = Math.round((e.loaded / e.total) * 100);

				if (percentLoaded < 100) {
					progress.style.width = percentLoaded + '%';
					progress.textContent = percentLoaded + '%';
				}
			}
		};

		xhr.onload = function(e) {
			Debugger.log("onLoad 접속");
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
