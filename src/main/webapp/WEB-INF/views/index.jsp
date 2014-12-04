<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@taglib uri="http://www.springframework.org/tags/form" prefix="form"%>

<html>
<head>
<title>Home</title>
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="description" content="">
<meta name="viewport" content="width=device-width, initial-scale=1">

<!-- Place favicon.ico and apple-touch-icon.png in the root directory -->

<script src="http://code.jquery.com/jquery-2.1.1.js"></script>
<link rel="stylesheet" href="./css/main.css">
<link rel="stylesheet"
	href="//code.jquery.com/ui/1.11.2/themes/smoothness/jquery-ui.css">
<script src="http://code.jquery.com/ui/1.11.2/jquery-ui.js"></script>
<script src="./js/main.js"></script>



<script type="text/javascript">

// 로그인 버튼 클릭시 Ajax로 로그인 처리 
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
		
// 회원가입 버튼 클릭시 ajax 회원가입 처리
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
				console.log("가입 성공");
			}
			function onError(data, status) {
				alert("error");
			}
		});
	});
	
// 다음 버튼 클릭시 로그인 체크해서 로그인 안되어있으면 로그인 하라는 alert 띄우고 
// 로그인 되어 있으면 다음 페이지로 넘어가게 해준다
	function loginCheck() {
		if ("${member.m_id}"=="") {
			alert("로그인을 해주세요!");
		} else {
			window.location.href="/fileupload";
		};
	};
</script>

</head>
<body>

	<!--  세션값 받아오는지 확인 하기 위한 코드 -->
	<%=session.getAttribute("member")%><br /> ${member.m_id}
	<br /> ${member.m_pw}
	<br /> ${member.m_name}
	<br /> ${member.m_email}
	<br />
	
	<!-- 로그인 -->
	<form id="login_form" method="post"
		action="<%=request.getContextPath()%>/login">
		ID <input type="text" name="m_id"></input><br /> pass <input
			type="password" name="m_pw"></input><br /> <input type="submit"
			value="로그인" id="login"></input><br />
	</form>

	<!-- 로그아웃 -->
	<c:if test="${ not empty member.m_id }">
		<a href="<%=request.getContextPath()%>/logout">로그아웃</a>
	</c:if>
	
	<!-- 회원가입 -->
	<form id="signup_form" method="post"
		action="<%=request.getContextPath()%>/signup">
		ID <input type="text" name="m_id"></input><br /> pass <input
			type="password" name="m_pw"></input><br /> name<input type="text"
			name="m_name""></input><br /> email <input type="text"
			name="m_email"></input><br /> <input type="submit" value="가입하기"
			id="signup"></input><br />
	</form>

	<!--  버튼 클릭시 로그인 검사 -->
	<button onClick="loginCheck()">다음</button>



</body>
</html>
