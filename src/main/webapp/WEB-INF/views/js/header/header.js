$(document).ready(function() {
	//로그인 버튼 클릭시 Ajax로 로그인 처리 
	$('#login').click(function(event) {
		var formData = $('#login_form').serialize();
		$.ajax({
			type : "POST",
			url : "/login",
			data : formData,
			success : onSuccess,
			error : onError
		});
		event.preventDefault();
		function onSuccess(data) {
			if(data=="loginError"){
				alert("아이디와 패스워드를 정확히 입력해 주세요");
			}
			window.location.href="/";  // 정상적으로 로그인시 index 페이지 다시로딩
		}
		function onError(data, status) {
			alert("error");   				// 정상적 처리가 되지 않았을때 에러창 띄움
		}
	});

	// 로그아웃 버튼 클릭스 Ajax로 로그아웃 처리
	$('#logout').click(function(event) {
		$.ajax({
			type : "POST",
			url : "/logout",
			success : onSuccess,
			error : onError
		});
		event.preventDefault();
		function onSuccess(data) {
			window.location.href="/";  // 정상적으로 로그인시 index 페이지 다시로딩
		}
		function onError(data, status) {
			alert("error");   				// 정상적 처리가 되지 않았을때 에러창 띄움
		}
	});

	//	회원가입 버튼 클릭시 ajax 회원가입 처리
	$('#signup').click(function(event) {
		event.preventDefault();
		console.log("signup 들어옴")
		var formData = $('#signup_form').serialize();
		$.ajax({
			type : "POST",
			url : "/signup",
			data : formData,
			success : onSuccess,
			error : onError
		});
		
		/**
		 * 반환값 정리 
		 *  1 : 회원가입 성공 
		 *  2 : 회원가입 DB입력중 오류발생
		 *  3 : 아이디 중복
		 */
		function onSuccess(data) {
			console.log(data);
			if (data==1){
				alert("회원가입이 완료되었습니다.");
			} else if (data==2) {
				alert("회원가입중 오류가 발생하였습니다. 다시 시도해 주세요");
			} else if (data==3) {
				alert("이미 존재하는 아이디 입니다.")
			}
			
			window.location.href="/";
		}
		function onError(data) {
			alert("error");
		}
	});
	
	
	// 특수문자 체크
	function wordCheck(thisword){
		var flag = true;
		var specialChars="~`!@#$%^&*-=+\\|[](){};:'<.,>/?";
		wordadded = thisword;
		for (i = 0; i < wordadded.length; i++) {
			for (j = 0; j < specialChars.length; j++) {         
				if (wordadded.charAt(i) == specialChars.charAt(j)){         
					flag=false;
					break;
				}
			}
		}
		return flag;
	}

	// 문자열중 공백 체크
	function wordCheckSpace(strValue){
		var flag=true;
		if (strValue!=""){
			for (var i=0; i < strValue.length; i++){
				if (strValue.charAt(i) == " "){
					flag=false;
					break;
				}
			}
		}
		return flag;
	}
	
});
