//로그인 버튼 클릭시 Ajax로 로그인 처리 
$(document).ready(function() {

	$('#login').click(function(event) {
		var formData = $('#login_form').serialize();
		$.ajax({
			type : "POST",
			url : "/login",
			cache : false,
			data : formData,
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

		var formData = $('#signup_form').serialize();
		$.ajax({
			type : "POST",
			url : "/signup",
			cache : false,
			data : formData,
			success : onSuccess,
			error : onError
		});
		event.preventDefault();
		function onSuccess(data) {
			window.location.href="/";
		}
		function onError(data, status) {
			alert("error");
		}
	});
});

//다음 버튼 클릭시 로그인 체크해서 로그인 안되어있으면 로그인 하라는 alert 띄우고 
//로그인 되어 있으면 다음 페이지로 넘어가게 해준다
function loginCheck() {
	if ("${member.m_id}"=="") {
		alert("로그인을 해주세요!");
	} else {
		/* window.location.href="/fileupload"; */
		document.getElementById("upload_form").submit();
	};
};