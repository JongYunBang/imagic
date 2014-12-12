$(document).ready(function() {
	var m_id = document.getElementById('m_id').value;
	
	// 태그 생성 funtion
	function createFolder(element, dirName){
		// 삭제 요청 (열우) : 새롭게 구현 함
//		element.innerHTML = dirName + 
//		"<button id='"+ dirName + "' class='rename'>이름변경</button> " +
//		"<button id='" + dirName + "' class='delete'>삭제</button>";
		
		// 열우 2014. 12. 7 일 (01:28) : 폴더 클릭 시 파일 리스트를 가져오기 위해서 a 태그 추가
		element.innerHTML = "<span id='" + dirName + "' class='folder'>" + dirName +   
		"<button id='"+ dirName + "' class='rename'>이름변경</button> " +
		"<button id='" + dirName + "' class='delete'>삭제</button></span>";
		
	}
	
	// 폴더명 고치는 function
	$(document).on('click', '.rename', function(e) {
		// 로그인 아이디값(히든) 가져오기
		var m_id = document.getElementById('m_id').value;
		var oldDirName = e.target.id;
		var newDirName = prompt("변경하실 폴더명을 입력하세요!", oldDirName);
		
		if (newDirName.trim() == "") {
			alert("공백을 입력하실수 없습니다.");
			return;
		}
		if (newDirName == null) {
			return;
		}
		// 이미 폴더 존재하는지 여부 확인
		$.ajax({
			type : "POST",
			url : "/renamedir",
			cache : false,
			data : {
				"oldDirName" : oldDirName,
				"newDirName" : newDirName,
				"m_id" : m_id
			},
			success : onSuccess,
			error : onError
		});
		
		function onSuccess(data) {
			if(data=="true"){
				alert("변경되었습니다.");
				var dirElement = e.target.parentElement.parentElement;
				dirElement.id=newDirName;
				createFolder(dirElement, newDirName);
				dirElement.childNodes[0].classList.add("clicked");
			}else if(data=="false"){
				alert("이미 존재하는 폴더명입니다.");
			}
		}
		function onError(data, status) {
			alert("이름 변경하기가 실패하였습니다.(응답없음)");
		}
	});
	
	// 폴더 삭제 버튼 클릭시
	$(document).on('click', '.delete', function(e) {
	if (confirm('경고 : 폴더 안에 있는 모든 데이터들이 삭제 됩니다. 계속 진행하시겠습니까?')) {
		
		var dirName = e.target.id;
		console.log(dirName);
		$.ajax({
			type : "POST",
			url : "/deleteDir",
			cache : false,
			data : {
				"m_id" : m_id,
				"dirName" : dirName
			},
			success : onSuccess,
			error : onError
		});
		
		/**
		 * 반환값 정리
		 * deleteDirSuccess : DB, FileSystem 동시에 삭제 성공
		 * deleteDirDBFail : DB 에서의 dirName 삭제 실패
		 * deleteDirFail : DB는 삭제 했으나 FileSystem 존재
		 * deleteDirEx : Exception 발생하고 삭제 실패
		 */


		function onSuccess(data) {
			console.log(data);
			if(data=="deleteDirSuccess"){
				alert("삭제하였습니다.");
				e.target.parentElement.parentElement.remove();
				dropzone.resetDropzone();
				hasFiles = 0;
				//window.location.href="/fileupload";
			}else if(data=="deleteDirDBFail"){
				alert("실패 : DB 에서의 dirName 삭제 실패");
			}else if(data=="deleteDirFail") {
				alert("실패 : DB는 삭제 했으나 FileSystem 존재");
				
				// 열우 2014. 12. 6 토 (23:50) : DB에서는 삭제했기 때문에 목록에서도 지워줘야함.
				//e.target.parentElement.remove();
				dropzone.resetDropzone();
			}else if(data=="deleteDirEx") {
				alert("실패 : Exception 발생하고 삭제 실패");
			}
		}
		function onError(data, status) {
			alert("폴더 삭제하기가 실패하였습니다(응답없음)");
		}
		}
	});

	// 폴더 생성 클릭시 프롬프트창으로 폴더명 입력받아서 DB에 저장하고 태그로 폴더생성까지
	$('#file_dir_create').click(function() {
		var dirName = prompt("폴더명을 입력해주세요", "폴더명");
		if (dirName == null) {
			return;
		}

		if (dirName.trim()== "") {
			alert("공백을 입력하실수 없습니다.");
			return;
		}
		// console.log(createDirName);
		var m_id = $('#m_id').val();
		// console.log(m_id);

		$.ajax({
			type : "POST",
			url : "/dircreate",
			cache : false,
			data : {
				"createName" : dirName,
				"m_id" : m_id
			},
			success : onSuccess,
			error : onError
		});

		/***********************************************************************
		 * 반환값 정리 
		 * dirFail : 디렉토리 생성 실패 
		 * dirDBInsert : DB 삽입 성공 
		 * dirDBInsertFail :DB 삽입 실패
		 * dirExist : 디렉토리 존재
		 */
		function onSuccess(data) {
			if (data == "dirExist"){
				alert("같은 이름의 디렉토리가 존재합니다!");
			}else if (data == "dirFail") {
				alert("디렉토리 생성실패");
			}else if (data == "dirDBInsertFail") {
				alert("DB 삽입 실패");
			}else if (data == "dirDBInsert") {
				// 태그 추가
				var userDirList = document.getElementById('file_user_dir');
				var newDir = document.createElement('li');
				newDir.id = dirName;
				createFolder(newDir, dirName);
				userDirList.appendChild(newDir);
			}
		}
		function onError(data, status) {
			alert("폴더 생성에 실패하였습니다(응답없음)");
		}
	});

	//	열우 2014. 12. 7 일 (01:39) : 폴더 클릭 시 파일 리스트를 받아오기 위한 함수
	$(document).on('click', '.folder', function (e) {
// 종윤 2014. 12. 8 월 (15:27) : 폴더 선택 시 버튼 생성 여부
		// 사용자 폴더 ul 선택
		dropzone.resetDropzone();
		hasFiles=0;
		var dir_elements = document.getElementsByClassName('folder');
//		console.log(dir_elements);
		for (var i=0; i < dir_elements.length; i++){
			var dir_element = dir_elements[i];
			dir_element.classList.remove("clicked");
		}
//		console.log(e.target.id);
		e.currentTarget.classList.add("clicked");
		
		var m_id = $('#m_id').val();
		$('#drop_zone').data("folder", $(this)[0].id);
		$.ajax({
			type : "POST",
			url : "/filelist",
			cache : false,
			data : {
				"m_id" : m_id,
				"dirName" : e.target.id
			},
			success : onSuccess,
			error : onError
		});
		function onSuccess(data) {
			var imgThumbArray =[];
			for (var i=0; i<data.length; i++) {
				var id = data[i].m_id;
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
			// 드랍존에게 썸네일 배열을 넘김
			dropzone.createFileElement(imgThumbArray);
			
			
		}
		function onError(data, status) {
			alert("리스트를 불러오는데에 실패하였습니다.");
		}
	});
	
});
