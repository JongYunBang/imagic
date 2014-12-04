 
$(document).ready(function () {
	
	// 페이지 주소로 들어온 사람들에 대해 로그인 검사
	if ("${member.m_id}"=="") {	    //  세션값을 자바스크립트에서 jstl 태그 로 값 불러오기 가능
		alert("로그인 해주세요!");
		window.location.href="/";
	};
	// 폴더 생성 클릭시 프롬프트창으로 폴더명 입력받아서 DB에 저장하고 태그로 폴더생성까지
	$('#file_dir_create').click(function () {
		var dirName= prompt("폴더명을 입력해주세요", "폴더명");
		if (dirName=="") {
			alert("공백을 입력하실수 없습니다.");
			return ;
		}
		//console.log(createDirName);
		var m_id =$('#m_id').val();
		//console.log(m_id);
		
		$.ajax({
			type : "POST",
			url : "/dircreate",
			cache : false,
			data : {"createName": dirName, "m_id": m_id},
			success : onSuccess,
			error : onError
		});
		
		/* *
		 *반환값 정리 
		 * dirFail : 디렉토리 생성 실패
		 * dirDBInsert : DB 삽입 성공 
		 * dirDBInsertFail : DB 삽입 실패
		 */
		function onSuccess(data) {
			console.log(data);
			if (data=="dirFail"){
				alert("디렉토리 생성실패");
			}
			if (data=="dirDBInsertFail") {
				alert("DB 삽입 실패");
			}
			if (data=="dirDBInsert") {
				// 태그 추가
				var d = document.getElementById('file_user_dir');
				var s = document.createElement('li');
				s.innerHTML = "<li id='" + dirName + "'"
				console.log(d);
				
			}
		}
		function onError(data, status) {
		}
		
	});
	
	
});

