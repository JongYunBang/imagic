$(document).ready(function() {
	
	$('.rename').click(function(e) {
		// 로그인 아이디값(히든) 가져오기
		var m_id = document.getElementById('m_id').value;
		var oldDirName = e.target.id;
		var newDirName = prompt("변경하실 폴더명을 입력하세요!", oldDirName);
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
			console.log(data);
			if(data){
				alert("변경되었습니다.");
				var dirElement = e.target.parentElement;
				dirElement.innerHTML = newDirName;
				dirElement.id=newDirName;
			}else{
				alert("이미 존재하는 폴더명입니다.");
			}
		}
		function onError(data, status) {
		}
		
	});
	
	
	// 페이지 주소로 들어온 사람들에 대해 로그인 검사
	if ("${member.m_id}" == "") { // 세션값을 자바스크립트에서 jstl 태그 로 값 불러오기 가능
		alert("로그인 해주세요!");
		window.location.href = "/";
	}
	
	// 폴더 생성 클릭시 프롬프트창으로 폴더명 입력받아서 DB에 저장하고 태그로 폴더생성까지
	$('#file_dir_create').click(function() {
		var dirName = prompt("폴더명을 입력해주세요", "폴더명");
		if (dirName == "") {
			alert("공백을 입력하실수 없습니다.");
			return;
		}
		if (dirName == null) {
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
		 * 반환값 정리 dirFail : 디렉토리 생성 실패 dirDBInsert : DB 삽입 성공 dirDBInsertFail :
		 * DB 삽입 실패
		 */
		function onSuccess(data) {
			console.log(data);
			if (data == "dirFail") {
				alert("디렉토리 생성실패");
			}
			if (data == "dirDBInsertFail") {
				alert("DB 삽입 실패");
			}
			if (data == "dirDBInsert") {
				// 태그 추가
				var userDirList = document.getElementById('file_user_dir');
				var newDir = document.createElement('li');

				newDir.innerHTML = "<li id='" + dirName + "'>" + dirName + "</li>";
				newDir = newDir.childNodes[0];
				userDirList.appendChild(s);
			}
		}
		function onError(data, status) {
		}

	});

});
