<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@taglib uri="http://www.springframework.org/tags/form" prefix="form"%>

<!DOCTYPE html>
<html>
<head lang="ko">
	<script src="../js/jquery2.1.1.js"></script>
	<script src="../js/bootstrap.min.js"></script>
	<script src="../js/header/header.js"></script>
	<link href="../css/bootstrap.css" rel="stylesheet">
	<link href="../css/common.css" rel="stylesheet">
	<link href="../css/header/modal.css" rel="stylesheet">
	<link href="../css/header/header.css" rel="stylesheet">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<meta charset="UTF-8">
<!-- Place favicon.ico and apple-touch-icon.png in the root directory -->
<title>Imagic</title>
</head>
<body>
<div class="navbar navbar-inverse">
        <div class="navbar-header">
            <button type="button" class="navbar-toggle" data-toggle="collapse"
                    data-target=".navbar-inverse-collapse">
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
            </button>
            <!-- 로고 넣는 부분 -->
            <a class="navbar-brand" href="<%=request.getContextPath()%>/">iMagic</a>
        </div>
        <div class="navbar-collapse collapse navbar-inverse-collapse">
            <ul class="nav navbar-nav">

            </ul>
            <ul class="nav navbar-nav navbar-right">
            	<!-- 헤더 오른쪽 메뉴 -->
				<c:choose>
					<c:when test="${empty member.m_id }"> 
						<li><a href="#" data-toggle="modal" data-target=".bs-modal-sm"><span class="glyphicon glyphicon-log-in"></span>Log-in</a></li>
						<li><a href="#" data-toggle="modal" data-target=".bs-modal-lg" id="register"><span class="glyphicon glyphicon-star"></span>Register</a></li>
					</c:when>
					<c:otherwise>
						<li>
							<a data-toggle="dropdown" class="dropdown-toggle"><span class="glyphicon glyphicon-user"></span>${member.m_name}<span class="caret"></span></a>
						  		<ul class="dropdown-menu" role="menu">
						    		<li><a href="#" data-toggle="modal" data-target="#settingModal"><span class="glyphicon glyphicon-cog"></span>Setting</a></li>
<!-- 						    		<li><a href="#">Another action</a></li> -->
<!-- 						    		<li><a href="#">Something else here</a></li> -->
						    		<li class="divider"></li>
						    		<li><a href="#" id="logout"><span class="glyphicon glyphicon-log-out"></span>Logout</a></li>
						  		</ul>
				 		</li>
					
<%-- 					<form id="logoutForm" method="post" action="<%=request.getContextPath()%>/logout"> --%>
<!-- 						<input style="display: none;" type="submit" value="로그아웃"> -->
<!-- 						<li><a id="logout">Log-out</a></li> -->
<%-- 					</form> --%>
					</c:otherwise>
				</c:choose>
<!-- 				<li><a data-toggle="modal" data-target=".bs-modal-sm">Log-in</a></li> -->
				


			</ul>
        </div>
    </div>
    <!-- *************************** Modal 시작 ******************************* -->
   
<%@ include file="signin_modal.jsp"%>
<%@ include file="signup_modal.jsp"%>
<%@ include file="setting_modal.jsp"%>


<%-- 	<!-- 회원탈퇴 -->
	<c:if test="${ not empty member.m_id }">
		<form method="post" action="<%=request.getContextPath()%>/withdraw">
			<input type="hidden" name="m_id" value="${member.m_id}">
			<input type="submit" value="회원탈퇴">
		</form>
	</c:if>
 --%>

	