/**
 *   created by Sung Yeol Woo. (2014. 11. 26)
 */
$(function() {
	
	// 메인 객체
	var dropzone = dropzone || {};
	var output = [];
	var maxFiles = 9;		// 최대 업로드 가능 파일 수
	var files;
	var thumbnailWidth = 100;
    var thumbnailHeight = 100;
	dropzone.createThumbnails = function (file) {
		var fileWidth = file.width;
		var fileHeight = file.height;
		
		Debugger.log(fileWidth, "fileWidth");
		Debugger.log(fileHeight, "fileHeight");
    }
	// console 디버깅을 편하게 하기 위한 함수 객체
	// 사용법은 단순한 메시지를 보려면 메시지만 입력하면 되고
	// 나중에 log 삭제 및 가독성을 위해 뒤에 함수명을 입력해주면 더욱 좋다.
	var Debugger = function() {};
	Debugger.log = function(message, funcName) {
		try{
			if (funcName){
				console.log(funcName + " : " + message);
			}else{
				console.log(message);
			}
		}catch(exception) {
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
			return false;		// upload 가능한지 여부
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
		if(!dropzone.canUpload(files.length)) {
			return false;
		}
		
		// 파일이 파일객체들의 파일리스트로 존재한다.
		for (var i = 0; f = files[i]; i++) {
			
			output.push('<li><strong>' + f.name + '</strong> (' +  f.type + 
					') - ' + f.size + 'bytes, last modified : ' + 
					f.lastModifiedDate.toLocaleDateString() + '</li>');
			Debugger.log("handleFileSelect");
			
		}
		
		get('drop_zone').innerHTML = '<ul>' + output.join(' ') + '</ul>';
	}

	dropzone.handleDragSelect = function(evt) {
		evt.stopPropagation();
		evt.preventDefault();
		var files = evt.dataTransfer.files; // FileList 객체

		// 파일 업로드가 가능한지 확인한다.
		if(!dropzone.canUpload(files.length)) {
			return false;
		}
		
		// 파일이 파일객체들의 파일리스트로 존재한다.
		for (var i = 0, f; f = files[i]; i++) {
			output.push('<li><strong>' + f.name + '</strong> (' +  f.type + 
					') - ' + f.size + 'bytes, last modified : ' + 
					f.lastModifiedDate.toLocaleDateString() + '</li>');
			Debugger.log(files[i], "handleDragSelect");
		}
		get('drop_zone').innerHTML = '<ul>' + output.join(' ') + '</ul>';
	}

	dropzone.handleDragOver = function(evt) {
		evt.stopPropagation();
		evt.preventDefault();
		evt.dataTransfer.dropEffect = 'copy';
	}
	
	dropzone.thumbnail = function() {
		Debugger.log(dropzone.createThumbnails(files[0]));
	}

	// EventListener 등록
	get('drop_zone').addEventListener('dragover', dropzone.handleDragOver, false);
	get('drop_zone').addEventListener('drop', dropzone.handleDragSelect, false);
	get('drop_zone').addEventListener('click', dropzone.fileClick, false);
	get('files').addEventListener('change', dropzone.handleFileSelect, false);
	get('clear-dropzone').addEventListener('click', dropzone.thumbnail, false);
})
