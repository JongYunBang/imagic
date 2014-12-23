<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@taglib uri="http://www.springframework.org/tags/form" prefix="form"%>

<!DOCTYPE html>
<html>
<head>

<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="description" content="">
<meta name="viewport" content="width=device-width, initial-scale=1">

<!-- Place favicon.ico and apple-touch-icon.png in the root directory -->

<script src="../js/jquery2.1.1.js"></script>

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
				window.location.href="/";
			}
			function onError(data, status) {
				alert("error");
			}
		});
	});
	
// 다음 버튼 클릭시 로그인 체크해서 로그인 안되어있으면 로그인 하라는 alert 띄우고 
// 로그인 되어 있으면 다음 페이지로 넘어가게 해준다
	
</script>

<title>Imagic</title>
</head>
<body>

	<!--  세션값 받아오는지 확인 하기 위한 코드 -->
	Session_Object : <%=session.getAttribute("member")%>
	<br />Request_Object : <%=request.getAttribute("member") %>
	<br />ModelAndView_Object : ${member}
	<br />ID :  ${member.m_id}
	<br />PW :  ${member.m_pw}
	<br />NAME :  ${member.m_name}
	<br />E-MAIL: ${member.m_email}
	<br />STATE :
				
	
	<!-- 로그인 -->
	<form id="login_form" method="post"
		action="<%=request.getContextPath()%>/login">
		<label  for="m_id">ID</label>
		<input type="text" name="m_id" id="m_id" value="a" required/><br/>
		<label  for="m_pw">Password</label>
		<input type="password" name="m_pw" id="m_pw" value="a" required/><br /> 
		<input type="submit" value="로그인" id="login"/><br />
	</form>

	<!-- 로그아웃 -->
	<c:if test="${ not empty member.m_id }">
		<form method="post" action="<%=request.getContextPath()%>/logout">
			<input type="submit" value="로그아웃">
		</form>
	</c:if>
	<!-- 회원탈퇴 -->
	<c:if test="${ not empty member.m_id }">
		<form method="post" action="<%=request.getContextPath()%>/withdraw">
			<input type="hidden" name="m_id" value="${member.m_id}">
			<input type="submit" value="회원탈퇴">
		</form>
	</c:if>
	<!-- 회원가입 -->
	<form id="signup_form" method="post" action="<%=request.getContextPath()%>/signup">
		<label  for="m_id">ID</label>
		<input type="text" name="m_id" id="m_id" required/><br/>
		<label  for="m_pw">Password</label>
		<input type="password" name="m_pw" id="m_pw" required/><br /> 
		<label  for="m_name">Name</label>
		<input type="text" name="m_name" id="m_name" required/><br />
		<label  for="m_email">E-mail</label> 
		<input type="email" name="m_email" id="m_email" placeholder="imagic@imagic.kr" required/><br /> 
		<input type="submit" value="가입하기" id="signup"/><br />
	</form>

	