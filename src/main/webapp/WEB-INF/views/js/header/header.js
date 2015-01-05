function hasBrowser() {
	var agt = navigator.userAgent.toLowerCase();
	if (agt.indexOf("chrome") != -1) return 'Chrome'; 
	if (agt.indexOf("opera") != -1) return 'Opera'; 
	if (agt.indexOf("staroffice") != -1) return 'Star Office'; 
	if (agt.indexOf("webtv") != -1) return 'WebTV'; 
	if (agt.indexOf("beonex") != -1) return 'Beonex'; 
	if (agt.indexOf("chimera") != -1) return 'Chimera'; 
	if (agt.indexOf("netpositive") != -1) return 'NetPositive'; 
	if (agt.indexOf("phoenix") != -1) return 'Phoenix'; 
	if (agt.indexOf("firefox") != -1) return 'FireFox'; 
	if (agt.indexOf("safari") != -1) return 'Safari'; 
	if (agt.indexOf("skipstone") != -1) return 'SkipStone'; 
	if (agt.indexOf("msie") != -1) return 'IE'; 
	if (agt.indexOf("netscape") != -1) return 'Netscape'; 
	if (agt.indexOf("mozilla/5.0") != -1) {
		if (navigator.userAgent.search('Trident') != -1) {
			return "IE";
		}else{
			return 'Mozilla';
		}
	}
}

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
	


$(document).ready(function() {
	
	// 백스페이스 막기
	$(document).keydown(function(e){ 
        if(e.target.nodeName != "INPUT" && e.target.nodeName != "TEXTAREA"){       
            if(e.keyCode === 8){   
            return false;
            }
        }
    });
 
	
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
			console.log(data);
			if (data=="loginError"){
				alert("아이디나 비번을 잘못 입력하셨습니다. 다시입력하세요");
			} else if(data == "loginSuccess"){
				window.location.href="/";  // 정상적으로 로그인시 index 페이지 다시로딩
			}
		}
		function onError(data, status) {
			alert("error");   				// 정상적 처리가 되지 않았을때 에러창 띄움
		}
	});

	// 회원가입 버튼을 눌렀을 때 기본값 초기화
	$('#register').click(function(event) {
		var signInput = $('.signCover input');
		var signSpan = $('.signCover span');
		for(var i=0;i<signInput.length-1;i++) {
			signInput[i].value = "";
			signSpan[i].style.display = "none";
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

	// 회원 탈퇴 버튼 클릭 시 발생되는 이벤트 
	$('#withdraw').click(function(event) {
		var formData = $('#withdraw_form').serialize();
		$.ajax({
			type : "POST",
			url : "/withdraw",
			data : formData,
			success : onSuccess,
			error : onError
		});
		event.preventDefault();
		function onSuccess(data) {
			alert("탈퇴되었습니다.");
			window.location.href="/";
		}
		function onError(data, status) {
			alert("error");
		}
	});
});
