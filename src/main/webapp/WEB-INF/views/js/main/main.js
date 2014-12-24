
//다음 버튼 클릭시 로그인 체크해서 로그인 안되어있으면 로그인 하라는 alert 띄우고 
//로그인 되어 있으면 다음 페이지로 넘어가게 해준다

$(document).ready(function() {
	$('#btn_start').click(function(event) {
		document.getElementById('upload_form').submit();
	});
	
});